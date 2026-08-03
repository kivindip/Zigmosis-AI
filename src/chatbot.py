def generate_answer(question):

    question = question.lower()


    if "eat" in question or "food" in question:

        return """
Your pet may have a reduced appetite due to stress,
diet changes, or health issues.

Check:
- Water intake
- Eating behaviour
- Energy level

If your pet refuses food for more than 24 hours,
consult a veterinarian.
"""


    elif "vaccin" in question:

        return """
Vaccination schedules depend on your pet's age,
species, and health condition.

Keep vaccination records updated and consult
a veterinarian for recommended vaccines.
"""


    elif "skin" in question or "itch" in question:

        return """
Skin problems may be caused by allergies,
parasites, or infections.

Check for:
- Redness
- Hair loss
- Excessive scratching

A veterinary check is recommended if symptoms continue.
"""


    elif "dog" in question:

        return """
Dogs need balanced nutrition, regular exercise,
vaccinations, and routine health monitoring.

Zigmosis recommends maintaining a digital health
record for your pet.
"""


    elif "cat" in question:

        return """
Cats require proper nutrition, hydration,
vaccination, and regular health monitoring.

Observe changes in behaviour and appetite.
"""


    else:

        return """
I can help with pet health questions,
nutrition, behaviour, and general care.

Please provide more details about your pet's
condition.
"""