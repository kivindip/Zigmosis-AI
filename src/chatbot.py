def generate_answer(question):

    question = question.lower().strip()

    # -----------------------------
    # Greetings
    # -----------------------------
    if any(word in question for word in [
        "hi", "hello", "hey", "good morning",
        "good afternoon", "good evening"
    ]):

        return """
🐾 Hello! I'm PawPal AI.

Welcome to Zigmosis AI.

I'm your intelligent pet healthcare assistant.

I can help you with:

• Pet nutrition
• Vaccinations
• Dog care
• Cat care
• Puppy & kitten care
• Skin problems
• Vomiting
• Behaviour
• Emergency guidance
• General pet healthcare

How can I help your pet today?
"""

    # -----------------------------
    # Food / Nutrition
    # -----------------------------
    elif any(word in question for word in [
        "eat", "food", "not eating",
        "appetite", "hungry", "diet"
    ]):

        return """
🥣 PawPal Nutrition Advice

Loss of appetite may happen because of:

• Stress
• Sudden food changes
• Dental pain
• Digestive problems
• Illness

Please check:

✓ Water intake
✓ Energy level
✓ Vomiting
✓ Behaviour changes

If your pet refuses food for more than 24 hours,
please visit a veterinarian.
"""

    # -----------------------------
    # Vaccination
    # -----------------------------
    elif any(word in question for word in [
        "vaccine",
        "vaccination",
        "vaccin"
    ]):

        return """
💉 PawPal Vaccination Advice

Vaccinations help protect pets from serious diseases.

Recommended:

✓ Puppy/Kitten vaccinations
✓ Annual booster vaccines
✓ Rabies vaccination
✓ Regular veterinary visits

Keep your pet's vaccination history updated
inside Zigmosis.
"""

    # -----------------------------
    # Vomiting
    # -----------------------------
    elif any(word in question for word in [
        "vomit",
        "vomiting",
        "throw up"
    ]):

        return """
🤢 PawPal Health Advice

Vomiting can be caused by:

• Eating spoiled food
• Sudden diet changes
• Parasites
• Infection
• Digestive problems

Monitor:

✓ Water intake
✓ Energy level
✓ Frequency of vomiting

Seek veterinary care if vomiting continues,
contains blood, or your pet becomes weak.
"""

    # -----------------------------
    # Fever
    # -----------------------------
    elif "fever" in question:

        return """
🌡 PawPal Fever Advice

Possible signs:

• Warm ears
• Low energy
• Poor appetite
• Shivering

A veterinarian should examine your pet
if fever is suspected.
"""

    # -----------------------------
    # Skin
    # -----------------------------
    elif any(word in question for word in [
        "skin",
        "itch",
        "itching",
        "scratch",
        "hair loss",
        "rash"
    ]):

        return """
🐾 PawPal Skin Advice

Skin problems may occur because of:

• Allergies
• Fleas
• Parasites
• Bacterial infection
• Fungal infection

Watch for:

✓ Redness
✓ Hair loss
✓ Excessive scratching
✓ Swelling

Persistent symptoms require veterinary care.
"""

    # -----------------------------
    # Behaviour
    # -----------------------------
    elif any(word in question for word in [
        "behaviour",
        "behavior",
        "aggressive",
        "bite",
        "barking",
        "meow"
    ]):

        return """
🧠 PawPal Behaviour Advice

Behaviour changes may happen because of:

• Stress
• Pain
• Fear
• Anxiety
• New surroundings

Observe:

✓ Appetite
✓ Sleeping habits
✓ Activity level

Long-term behaviour changes should be checked
by a veterinarian.
"""

    # -----------------------------
    # Dog
    # -----------------------------
    elif "dog" in question:

        return """
🐶 PawPal Dog Care

Dogs need:

✓ Balanced nutrition
✓ Daily exercise
✓ Fresh drinking water
✓ Vaccinations
✓ Regular health checks

Routine veterinary visits help prevent many diseases.
"""

    # -----------------------------
    # Puppy
    # -----------------------------
    elif "puppy" in question:

        return """
🐶 Puppy Care

Young puppies require:

✓ High-quality puppy food
✓ Vaccinations
✓ Deworming
✓ Socialisation
✓ Clean drinking water

Regular veterinary visits are important during
the first year.
"""

    # -----------------------------
    # Cat
    # -----------------------------
    elif "cat" in question:

        return """
🐱 PawPal Cat Care

Cats require:

✓ Fresh water
✓ Quality nutrition
✓ Vaccinations
✓ Indoor safety
✓ Regular health monitoring

Watch for changes in appetite or behaviour.
"""

    # -----------------------------
    # Kitten
    # -----------------------------
    elif "kitten" in question:

        return """
🐱 Kitten Care

Kittens need:

✓ Kitten food
✓ Vaccinations
✓ Deworming
✓ Safe indoor environment
✓ Plenty of water

Monitor eating habits and litter box activity.
"""

    # -----------------------------
    # Emergency
    # -----------------------------
    elif any(word in question for word in [
        "emergency",
        "bleeding",
        "poison",
        "poisoning",
        "breathing",
        "collapse",
        "accident"
    ]):

        return """
🚨 PawPal Emergency Guidance

Seek immediate veterinary care if your pet has:

• Difficulty breathing
• Severe bleeding
• Poison exposure
• Seizures
• Sudden collapse
• Unconsciousness

PawPal provides guidance but cannot replace
professional emergency veterinary treatment.
"""

    # -----------------------------
    # Zigmosis
    # -----------------------------
    elif any(word in question for word in [
        "zigmosis",
        "qr",
        "identity",
        "profile"
    ]):

        return """
🐾 About Zigmosis

Zigmosis creates a secure digital identity
for every pet.

Features include:

✓ QR Pet Identity
✓ Digital Health Records
✓ PawPal AI Assistant
✓ Vision Verification
✓ Owner Information

Helping pets stay safer and healthier.
"""

    # -----------------------------
    # Goodbye
    # -----------------------------
    elif any(word in question for word in [
        "bye",
        "goodbye",
        "thanks",
        "thank you"
    ]):

        return """
🐾 You're welcome!

I'm always here whenever you need help with
your pet's health and care.

Have a wonderful day!
"""

    # -----------------------------
    # Default
    # -----------------------------
    else:

        return """
🐾 I'm PawPal AI.

I can help you with:

• Nutrition
• Vaccinations
• Behaviour
• Dog care
• Cat care
• Puppies
• Kittens
• Skin problems
• Vomiting
• Emergencies
• Zigmosis features

Please describe:

1. Your pet species
2. Age
3. Symptoms or question

I'll do my best to help.
"""