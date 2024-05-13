FROM python:3.9

WORKDIR /code

# 의존성 설치
COPY ./requirements.txt /code/requirements.txt

RUN pip install --upgrade pip
RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

# 소스 코드 복사
COPY ./b2b /code/b2b
COPY ./upload /code/upload

# 어플리케이션 실행
CMD ["uvicorn", "b2b.main:app", "--host", "0.0.0.0", "--port", "9000"]
