using Microsoft.OpenApi.Expressions;
using MongoDB.Bson;
using MongoDB.Driver;

var builder = WebApplication.CreateBuilder(args);

// Add MongoDB service
builder.Services.AddSingleton<MongoDbService>();

// Add CORS services and define policy
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

// Use CORS
app.UseCors("AllowAll");

// Root endpoint
app.MapGet("/", () =>
{
    string test = "it is a test";
    return Results.Json(new { message = "Home page", pageversion = "1.0", status = "OK", debug = test });
});

// Get listings from MongoDB
app.MapGet("/showrecords", (MongoDbService mongoDbService) =>
{
    var records = mongoDbService.GetAllRecords();
    
    return Results.Ok(records);
});

// Add new listing (simplified structure)
app.MapPost("/addrecord", async (MongoDbService mongoDbService, ListingRecord newRecord) =>
{
    await mongoDbService.AddRecord(newRecord);
    return Results.Ok(new { message = "Record added", record = newRecord });
});

// Delete listing by ID
app.MapDelete("/deleterecord/{id}", async (MongoDbService mongoDbService, string id) =>
{
    try
    {
        await mongoDbService.DeleteRecord(id);
        return Results.Ok(new { message = "Record deleted successfully", id = id });
    }
    catch (Exception ex)
    {
        return Results.Problem(ex.Message);
    }
});

app.Run();

// ------------------- MongoDB Service -----------------------

public class MongoDbService
{
    private readonly IMongoCollection<BsonDocument> _collection;

    public MongoDbService(IConfiguration config)
    {
        var connectionString = config.GetSection("MongoDB:ConnectionString").Value;
        var databaseName = config.GetSection("MongoDB:DatabaseName").Value;
        var client = new MongoClient(connectionString);
        var database = client.GetDatabase(databaseName);
        _collection = database.GetCollection<BsonDocument>("listingsAndReviews");
    }

    public List<ListingRecord> GetAllRecords()
    {
        var documents = _collection.Find(new BsonDocument()).Limit(10).ToList();
        var records = new List<ListingRecord>();

        foreach (var doc in documents)
        {
            records.Add(new ListingRecord
            {
                Id = doc["_id"]?.ToString(),
                Name = doc.GetValue("name", "").ToString(),
                Summary = doc.GetValue("summary", "").ToString(),
                Bedrooms = doc.TryGetValue("bedrooms", out var bedroomsVal) ? bedroomsVal.AsInt32 : (int?)null,
                Price = doc.TryGetValue("price", out var priceVal) ? priceVal.ToDouble() : (double?)null,
                Country = doc.Contains("address") && doc["address"].AsBsonDocument.Contains("country")
                    ? doc["address"]["country"].ToString()
                    : "Unknown"
            });
        }

        return records;
    }

    public async Task AddRecord(ListingRecord record)
    {
        var address = new BsonDocument { { "country", record.Country ?? "Unknown" } };

        var document = new BsonDocument
        {
            { "name", record.Name ?? "Unknown" },
            { "summary", record.Summary ?? "" },
            { "bedrooms", record.Bedrooms ?? 0 },
            { "price", record.Price ?? 0 },
            { "address", address }
        };

        await _collection.InsertOneAsync(document);
    }

    public async Task DeleteRecord(string id)
    {
        var filter = Builders<BsonDocument>.Filter.Eq("_id", new ObjectId(id));
        var result = await _collection.DeleteOneAsync(filter);

        if (result.DeletedCount == 0)
        {
            throw new Exception($"No record found with id: {id}");
        }
    }
}

// ------------------- Model -----------------------

public class ListingRecord
{
    public string? Id { get; set; }
    public string? Name { get; set; }
    public string? Summary { get; set; }
    public int? Bedrooms { get; set; }
    public double? Price { get; set; }
    public string? Country { get; set; }
}
