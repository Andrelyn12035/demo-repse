from fastapi import FastAPI
from pdf2image import convert_from_bytes, convert_from_path
import base64
from pydantic import BaseModel
import os
from PIL import Image
import io

class File(BaseModel):
    file: str

app = FastAPI()
 #uvicorn main:app --reload

def pdf_to_png(pdf_path):
    # Convert PDF to a list of images (one image per page)
    images = convert_from_path(pdf_path)
    return images

# Function to convert an image to Base64
def image_to_base64(png_image):
    buffered = io.BytesIO()
    png_image.save(buffered, format="PNG")
    #png_image.save("dds.png", format="PNG")
    img_str = base64.b64encode(buffered.getvalue())
    return img_str.decode('utf-8')




@app.get("/")
def root():
    return {"Hello": "World"}

@app.post("/pdf2image")
def pdf2image(req: File) -> str:
    bytes = base64.b64decode(req.file)
    #images = convert_from_bytes(bytes, poppler_path="C:/Users/Andres Ramirez/Downloads/Release-24.02.0-0/poppler-24.02.0/Library/bin")
    images = convert_from_bytes(bytes)
    #images[0].save("dds.png", format="PNG")
    base64_string = ''
    # Assuming you want to convert the first page
    if images:
      base64_string = image_to_base64(images[0])
      print(base64_string)
      return base64_string

    





# Function to convert PDF to PNG

# Example usage

