def generate_answer(question):

    question = question.lower()


    if "eat" in question or "food" in question:

        return """
Your pet may have a reduced appetite.

Possible reasons:
- Stress
- Diet changes
- Digestive problems
- Health issues

Monitor water intake and behaviour.
If your pet refuses food for more than 24 hours,
consult a veterinarian.
"""


    elif "vaccine" in question:

        return """
Vaccination depends on your pet's age and species.

Keep vaccination records updated and follow
a veterinarian recommended schedule.
"""


    elif "skin" in question or "itch" in question:

        return """
Skin problems may be caused by allergies or parasites.

Check for:
- Redness
- Scratching
- Hair loss

Consult a veterinarian if symptoms continue.
"""


    elif "dog" in question:

        return """
Dogs need balanced food, exercise, vaccinations,
and regular health monitoring.
"""


    elif "cat" in question:

        return """
Cats need proper nutrition, clean water,
vaccinations, and regular health checks.
"""


    else:

        return """
I can help with:
- Pet health
- Nutrition
- Vaccination
- General pet care

Please provide more details about your pet.
"""