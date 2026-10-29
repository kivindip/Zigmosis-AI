
def protect_response(text):
    if not isinstance(text, str):
        return (
            "Sorry, I couldn't prepare a safe response. "
            "Please try again."
        )

    # Remove unsupported medical certainty claims.
    banned_phrases = [
        "guaranteed cure",
        "diagnosis confirmed",
    ]

    for phrase in banned_phrases:
        text = text.replace(
            phrase,
            "please consult a veterinarian"
        )
        text = text.replace(
            phrase.title(),
            "please consult a veterinarian"
        )

    # Add a reminder for potentially urgent symptoms.
    emergency_terms = [
        "difficulty breathing",
        "severe bleeding",
        "loss of consciousness",
        "poison exposure",
        "seizure",
    ]

    if any(term in text.lower() for term in emergency_terms):
        text += (
            "\n\n🚨 If your pet may be experiencing an emergency, "
            "contact a veterinarian or emergency veterinary clinic "
            "immediately. Do not delay care while using this chatbot."
        )

    return text
