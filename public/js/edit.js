const newFormHandler = async (event) => {
    event.preventDefault();
  
    const id = event.target.getAttribute("data-id");
    const name = document.querySelector("#post-name").value.trim();
    const description = document.querySelector("#post-desc").value.trim();
  
    if (name && description) {
        console.log(`/api/posts/${id}`);
console.log(JSON.stringify({ name, description }));
      try {
        const response = await fetch(`/api/posts/${id}`, {
          method: "PUT",
          body: JSON.stringify({ name, description }),
          headers: {
            "Content-Type": "application/json",
          },
        });
  
        if (response.ok) {
          const updatedPost = await response.json(); // Parse the response JSON
          console.log("Updated Post:", updatedPost);
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
  
  document.querySelector(".edit-post-form").addEventListener("submit", newFormHandler);
  
  
  