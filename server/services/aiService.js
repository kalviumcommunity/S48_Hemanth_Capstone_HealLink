const getAISuggestions = async (symptoms) => {
  try {
    const input = symptoms.join(", ").toLowerCase();

    let response = "";

    // Smart pattern-based AI-like responses
    if (input.includes("fever") && input.includes("cough")) {
      response = "These symptoms may indicate a viral infection such as flu. Ensure proper rest, hydration, and monitor temperature regularly.";
    } 
    else if (input.includes("fever")) {
      response = "Fever is often a sign of infection. Stay hydrated, rest well, and consider mild medication if needed.";
    } 
    else if (input.includes("cough")) {
      response = "Cough may be caused by irritation or infection. Warm fluids and steam inhalation may help.";
    } 
    else if (input.includes("headache")) {
      response = "Headache can be due to stress, dehydration, or lack of sleep. Take rest and stay hydrated.";
    } 
    else if (input.includes("cold")) {
      response = "Cold symptoms can be managed with warm fluids, rest, and maintaining body warmth.";
    } 
    else {
      response = "Based on the provided symptoms, maintain a healthy diet, stay hydrated, and monitor your condition.";
    }

    // Add variation (makes it feel like real AI)
    const endings = [
      " Monitor symptoms closely.",
      " If symptoms persist, consult a healthcare professional.",
      " Avoid self-medication without guidance.",
      " Maintain proper rest and hygiene."
    ];

    const randomEnding = endings[Math.floor(Math.random() * endings.length)];

    return response + randomEnding + " ⚠️ This is not medical advice.";

  } catch (error) {
    return "AI suggestion not available";
  }
};

module.exports = { getAISuggestions };