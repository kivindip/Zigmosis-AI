from PIL import Image
from transformers import CLIPProcessor, CLIPModel
import torch


model = CLIPModel.from_pretrained(
    "openai/clip-vit-base-patch32"
)

processor = CLIPProcessor.from_pretrained(
    "openai/clip-vit-base-patch32"
)


def create_image_embedding(image_path):

    image = Image.open(
        image_path
    ).convert("RGB")


    inputs = processor(
        images=image,
        return_tensors="pt"
    )


    with torch.no_grad():

        image_features = model.get_image_features(
            **inputs
        )


    embedding = image_features[0].tolist()


    return embedding