import os
import replicate
import torch.nn as nn
import torch.nn.functional as F
from sentence_transformers import SentenceTransformer
import torch


def CLIP(image_link):
    # Get caption for image
    os.environ['REPLICATE_API_TOKEN'] = '6cdf7546f955d96f4db3508022a5f126022fc105'
    model = replicate.models.get("rmokady/clip_prefix_caption")
    return model.predict(image = image_link)

def Stable_Diffusion(prompt):
    os.environ['REPLICATE_API_TOKEN'] = '6cdf7546f955d96f4db3508022a5f126022fc105'
    model = replicate.models.get("stability-ai/stable-diffusion")
    return model.predict(prompt=prompt)

def Sincere(revision):
    class FullyConnected(nn.Module):
        def __init__(self, vocab_size, hidden1, hidden2, hidden3):
            super(FullyConnected, self).__init__()
            self.fc1 = nn.Linear(vocab_size, hidden1)
            self.fc2 = nn.Linear(hidden1, hidden2)
            self.fc3 = nn.Linear(hidden2, hidden3)
            self.fc4 = nn.Linear(hidden3, 1)
        
        def forward(self, inputs):
            x = F.relu(self.fc1(inputs.squeeze(1).float()))
            x = F.relu(self.fc2(x))
            x = F.relu(self.fc3(x))
            return self.fc4(x)
    BERT = SentenceTransformer('bert-base-nli-mean-tokens')
    revision = BERT.encode(revision)
    model = FullyConnected(768, 128, 64, 8)
    model.load_state_dict(torch.load(r'C:\Users\email\OneDrive\Documents\Python\quora_classifier\BERT_wikipedia_file', map_location=torch.device('cpu')))
    model = model.to('cpu')
    return round(torch.sigmoid(model(torch.tensor(revision).reshape([768,1]))).item())

if __name__ == "__main__":
    # print(Sincere("King arthur was a just and peaceful king"))
    # print(Stable_Diffusion("unicorn in spac vomiting corn"))
    print(CLIP("https://static.wikia.nocookie.net/pokemon/images/a/ae/Gary_Blastoise.png/revision/latest?cb=20210528230616"))