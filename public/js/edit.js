const newFormHandler = async (event) => {
    event.preventDefault();
  
    console.log("helolo");
    const id = event.target.getAttribute("data-id");
    console.log("Event target:", event.target);
  
    const name = document.querySelector("#post-name").value.trim();
    const description = document.querySelector("#post-desc").value.trim();
  
    console.log(name);
    console.log(description);
  
    if (name && description) {
      try {
        const response = await fetch(`/api/posts/${id}`, {
          method: "PUT",
          body: JSON.stringify({ name, description }),
          headers: {
            "Content-Type": "application/json",
          },
        });
  
        if (response.ok) {
          document.location.replace("/profile");
        } else {
          alert(`Failed to update post ${name}`);
        }
      } catch (error) {
        console.error("Error during fetch:", error);
        alert("Failed to update post. Please try again.");
      }
    } else {
      alert("Name and description are required.");
    }
  };
  
  console.log("hi");
  document.querySelector(".edit-post-form").addEventListener("submit", newFormHandler);
  
  