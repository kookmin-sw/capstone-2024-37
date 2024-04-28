from fastapi import FastAPI

import router

app = FastAPI()

app.include_router(router.auth_google_router)
app.include_router(router.user_router)
