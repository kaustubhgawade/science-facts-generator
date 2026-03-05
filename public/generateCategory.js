document.addEventListener("DOMContentLoaded", async (e) => {
  try {
    const categoriesElement = document.getElementById("categories");

    const response = await fetch("/api/generateFactCategories");
    const data = await response.json();

    if (data.status === "SUCCESS") {
      const categories = data.categories;
      categories.forEach((category) => {
        const btn = document.createElement("button");
        btn.classList.add("categories-btn");
        btn.classList.add("btn");
        btn.setAttribute("data-category", category);
        btn.innerText = category;
        categoriesElement.appendChild(btn);
      });
    } else {
      categoriesElement.innerText =
        "Failed to load science fact categories. Please try again.";
    }
  } catch (error) {
    console.log(error);
  } finally {
    document.querySelector("body").classList.remove("loading");
  }
});

async function generateScienceFactAccordingToCategory(category) {
  try {
    const response = await fetch(
      `/api/generateFactByCategory?category=${category}`,
    );
    const data = await response.json();

    if (data.status === "SUCCESS") {
      return data.fact;
    } else {
      return "Failed to load science fact. Please try again.";
    }
  } catch (error) {
    console.log(error);
    return "Failed to load science fact. Please try again.";
  }
}

// Event listener for category button clicks
const categoriesElement = document.getElementById("categories");
categoriesElement.addEventListener("click", async (e) => {
  if (e.target.classList.contains("categories-btn")) {
    const selectedCategory = e.target.getAttribute("data-category");
    
    // Show loader
    document.querySelector("body").classList.add("loading");
    
    // Hide categories and change p tag text
    categoriesElement.style.display = 'none';
    document.querySelector("p").innerText = "Here's your science fact...";
    
    // Fetch and display the fact
    const fact = await generateScienceFactAccordingToCategory(selectedCategory);
    document.getElementById("fact2").innerText = fact;
    document.getElementById("fact2").style.display = 'block';
    
    // Hide loader
    document.querySelector("body").classList.remove("loading");
  }
});
