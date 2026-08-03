def generate_answer(question):

    question = question.lower()


    if any(word in question for word in ["hello", "hi", "hey"]):

        return """
Hello! 🐾

I am PawPal AI, your Zigmosis pet healthcare assistant.

I can help you with:
• Pet nutrition
• Vaccinations
• Common health issues
• Behaviour changes
• General pet care

How can I help your pet today?
"""


    elif any(word in question for word in ["eat", "food", "hungry", "diet"]):

        return """
🐾 Nutrition Advice

Changes in eating habits can happen because of:
• Stress
• Diet changes
• Dental problems
• Illness

Please check:
✓ Water intake
✓ Energy level
✓ Vomiting or unusual behaviour

If your pet refuses food for more than 24 hours,
a veterinarian consultation is recommended.
"""


    elif any(word in question for word in ["vaccine", "vaccination"]):

        return """
💉 Vaccination Information

Vaccines protect pets from serious diseases.

Keep:
✓ Vaccination records updated
✓ Regular veterinary appointments
✓ Age-appropriate vaccines

Vaccination schedules depend on species, age and health condition.
"""


    elif any(word in question for word in ["skin", "itch", "hair", "rash"]):

        return """
🐶 Skin Health Advice

Skin problems may be caused by:
• Allergies
• Parasites
• Infections

Look for:
✓ Redness
✓ Hair loss
✓ Excessive scratching

Persistent symptoms should be checked by a veterinarian.
"""


    elif "dog" in question:

        return """
🐕 Dog Care Tips

Dogs need:
✓ Balanced nutrition
✓ Exercise
✓ Vaccinations
✓ Regular health monitoring

Zigmosis helps maintain your pet's digital health identity.
"""


    elif "cat" in question:

        return """
🐱 Cat Care Tips

Cats need:
✓ Proper nutrition
✓ Clean water
✓ Safe environment
✓ Regular health checks

Changes in behaviour or appetite should be monitored.
"""


    elif any(word in question for word in ["emergency", "danger", "critical"]):

        return """
🚨 Emergency Advice

If your pet has:
• Difficulty breathing
• Severe bleeding
• Loss of consciousness
• Poison exposure

Please contact a veterinarian immediately.

PawPal provides guidance but cannot replace professional veterinary care.
"""


    else:

        return """
🐾 I'm PawPal AI.

I can help you with:
• Food and nutrition
• Vaccinations
• Pet behaviour
• Skin issues
• General pet care

Please tell me:
1. Pet species
2. Age
3. Symptoms or concern

so I can provide better guidance.
"""