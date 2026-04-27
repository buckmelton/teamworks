import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import httpx


app = FastAPI(title="Teamworks API")

frontend_origin = os.getenv("FRONTEND_ORIGIN", "http://localhost:5173")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[frontend_origin],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


@app.get("/api/pokemon")
async def get_pokemon() -> list[dict[str, object]]:
    async with httpx.AsyncClient(timeout=20.0) as client:
        list_response = await client.get(
            "https://pokeapi.co/api/v2/pokemon",
            params={"limit": 151, "offset": 0},
        )
        list_response.raise_for_status()
        list_data = list_response.json()
        results = list_data.get("results", [])

        pokemon: list[dict[str, object]] = []
        for item in results:
            detail_url = item.get("url")
            if not detail_url:
                continue

            detail_response = await client.get(detail_url)
            detail_response.raise_for_status()
            detail = detail_response.json()

            pokemon.append(
                {
                    "id": detail.get("id"),
                    "name": detail.get("name"),
                    "sprite": detail.get("sprites", {}).get("front_default"),
                    "types": [
                        type_info.get("type", {}).get("name")
                        for type_info in detail.get("types", [])
                        if type_info.get("type", {}).get("name")
                    ],
                }
            )

    return pokemon
