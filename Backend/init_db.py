from dataBase.db import engine
from dataBase.models import Base

Base.metadata.create_all(engine)

