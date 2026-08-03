def protect_response(text):

    banned=[
        "guaranteed cure",
        "diagnosis confirmed"
    ]


    for word in banned:

        text=text.replace(
            word,
            ""
        )


    return text