import json


def load_documents():

    with open(
        "ai/knowledge_base.json",
        "r"
    ) as file:

        data=json.load(file)


    documents=[]

    for item in data:

        documents.append(
            item["topic"] +
            ": " +
            item["content"]
        )


    return documents