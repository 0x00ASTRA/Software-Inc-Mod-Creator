from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

app = FastAPI()

# Serve static files
app.mount("/static", StaticFiles(directory="static"), name="static")

# Serve the main HTML file at the root route
@app.get("/")
def app_root():
    return FileResponse("static/html/index.html")

@app.get("/SoftwareIncModCreatorMainPage.html")
def app_mainpage():
    return FileResponse("static/html/SoftwareIncModCreatorMainPage.html")

@app.get("/CompanyType.html")
def app_companytype():
    return FileResponse("static/html/CompanyType.html")

@app.get("/Name_Generator.html")
def app_namegenerator():
    return FileResponse("static/html/Name_Generator.html") 

@app.get("/softwareIncModCreatorSoftwareMini.html")
def app_softwareincmodcreatorsoftwaremini():
    return FileResponse("static/html/softwareIncModCreatorSoftwareMini.html")

@app.get("/softwareIncModCreatorSoftwareType.html")
def app_softwareincmodcreatorsoftwaretype():
    return FileResponse("static/html/softwareIncModCreatorSoftwareType.html")
