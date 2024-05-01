from fastapi import FastAPI
import uvicorn

import router

from starlette.middleware.cors import CORSMiddleware

app = FastAPI()

app.include_router(router.auth_google_router)
app.include_router(router.user_router)
app.include_router(router.chromadb_router)

origins = [
    "*",
    "http://localhost:9009",
    "http://localhost:8000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

if __name__ == "__main__":
    uvicorn.run(host="0.0.0.0", port=9009, app=app)