from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

app = FastAPI()

# Serve static files
app.mount("/static", StaticFiles(directory="app/static"), name="static")

# Serve the main HTML file at the root route
@app.get("/")
def app_root():
    return FileResponse("app/ui/html/index.html")

@app.get("/home")
def app_home():
    return FileResponse("app/ui/html/home.html")

@app.get("/company-type")
def app_companytype():
    return FileResponse("app/ui/html/company-type.html")

@app.get("/name-generator")
def app_namegenerator():
    return FileResponse("app/ui/html/name-generator.html") 

@app.get("/software-type-mini")
def app_softwareincmodcreatorsoftwaremini():
    return FileResponse("app/ui/html/softwareIncModCreatorSoftwareMini.html")

@app.get("/software-type")
def app_softwareincmodcreatorsoftwaretype():
    return FileResponse("app/ui/html/softwareIncModCreatorSoftwareType.html")
