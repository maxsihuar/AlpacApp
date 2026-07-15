using Core_graph_api.Models;
using Core_graph_api.Services;

var builder = WebApplication.CreateBuilder(args);

var allowedOrigins = builder.Configuration.GetSection("Cors:AllowedOrigins").Get<string[]>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowNodeBackend", policy =>
    {
        if (allowedOrigins != null && allowedOrigins.Length > 0)
        {
            policy.WithOrigins(allowedOrigins)
                  .AllowAnyHeader()
                  .AllowAnyMethod()
                  .AllowCredentials();
        }
        else
        {
            policy.AllowAnyOrigin()
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        }
    });
});

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddSingleton<Graph>();
builder.Services.AddSingleton<Graph_Services>();

var app = builder.Build();

// ---------------------------------------------------------------------
// 2. PIPELINE DE MIDDLEWARES (ORDEN ESTRICTO)
// ---------------------------------------------------------------------
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// EVITAR BUCLE HTTPS EN RENDER: 
// Solo redirigir a HTTPS localmente si no estamos en un entorno de producción como Render.
// Render gestiona el certificado SSL en su balanceador y se comunica con tu app vía HTTP.
if (app.Environment.IsDevelopment())
{
    app.UseHttpsRedirection();
}

app.UseCors("AllowNodeBackend");

app.UseAuthorization();

app.MapControllers();

// ---------------------------------------------------------------------
// 3. INYECCIÓN DE DATOS DE PRUEBA
// ---------------------------------------------------------------------
using (var scope = app.Services.CreateScope())
{
    var graphServices = scope.ServiceProvider.GetRequiredService<Graph_Services>();
    try
    {
        graphServices.Add_User("Edwin", "Carrasco Poblete", "EdwinPoblete@gmail.com", "Contrasena segura");
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Error al inicializar usuario de prueba: {ex.Message}");
    }
}

app.Run();