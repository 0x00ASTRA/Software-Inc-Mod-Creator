from fastapi import APIRouter

api_router = APIRouter()


@api_router.get("/name-generators/")
async def get_name_generators():
    return [{"name-generator": "Default", "generator-id": "0000000000"}, {"name-generator": "Default2", "generator-id": "0000000001"}]

