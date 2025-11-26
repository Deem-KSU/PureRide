function initThemeToggle() {
  var savedTheme = localStorage.getItem("theme");

  if (savedTheme !== "dark-theme" && savedTheme !== "light-theme") {
    savedTheme = "light-theme";
    localStorage.setItem("theme", savedTheme);
  }

  document.body.className = savedTheme;

  var btn = document.getElementById("themeToggleBtn");

  if (!btn) return;

  if (savedTheme === "dark-theme") {
    btn.innerHTML = "Switch to Light Theme";
  } else {
    btn.innerHTML = "Switch to Dark Theme";
  }

  btn.onclick = function () {
    if (document.body.className === "light-theme") {
      document.body.className = "dark-theme";
      btn.innerHTML = "Switch to Light Theme";
      localStorage.setItem("theme", "dark-theme");
    } else {
      document.body.className = "light-theme";
      btn.innerHTML = "Switch to Dark Theme";
      localStorage.setItem("theme", "light-theme");
    }
  };
}

window.onload = function () {
  initThemeToggle();
};




var backToTopBtn = document.getElementById("backToTopBtn");

if (backToTopBtn) {

  // حدث السكروول
  window.onscroll = function () {
    if (window.scrollY > 200) {
      backToTopBtn.classList.add("show");
    } else {
      backToTopBtn.classList.remove("show");
    }
  };

  // حدث الضغط على الزر
  backToTopBtn.onclick = function () {
    window.scrollTo({
      top: 0,
    });
  };

}




// ================= ساعة الفوتر =================
function updateFooterClock() {
  var clock = document.getElementById("footerClock");
if (!clock) return;
  var now = new Date();

  var timeString = now.toLocaleTimeString([], {
    hour:   "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false
  });

  clock.innerHTML = "Real Time Clock " + timeString;
}

updateFooterClock();
setInterval(updateFooterClock, 1000);



// ================= Sort services on Services page =================
var sortSelect = document.getElementById("sortServices");
var servicesContainerList = document.getElementsByClassName("services");

if (sortSelect && servicesContainerList.length > 0) {

    var servicesContainer = servicesContainerList[0];
    var cardsNodeList = servicesContainer.getElementsByClassName("card__continer");
    var cards = Array.prototype.slice.call(cardsNodeList);

    sortSelect.onchange = function () {
        var value = sortSelect.value;

        if (value === "price-asc" || value === "price-desc") {
            cards.sort(function (a, b) {
                var priceA = getPrice(a);
                var priceB = getPrice(b);

                if (value === "price-asc") {
                    return priceA - priceB;
                } else {
                    return priceB - priceA;
                }
            });
        }

        if (value === "name-asc" || value === "name-desc") {
            cards.sort(function (a, b) {
                var nameA = getName(a);
                var nameB = getName(b);

                if (nameA < nameB) {
                    return (value === "name-asc") ? -1 : 1;
                }
                if (nameA > nameB) {
                    return (value === "name-asc") ? 1 : -1;
                }
                return 0;
            });
        }

        for (var i = 0; i < cards.length; i++) {
            servicesContainer.appendChild(cards[i]);
        }
    };

    function getPrice(card) {
        var priceDiv = card.getElementsByClassName("card__price")[0];
        if (!priceDiv) return 0;

        var text = priceDiv.innerHTML;
        var number = parseFloat(text);

        if (isNaN(number)) {
            return 0;
        }
        return number;
    }

    function getName(card) {
        var title = card.getElementsByClassName("card__title")[0];
        if (!title) return "";
        return title.innerHTML.toLowerCase();
    }
}




var favButtons = document.getElementsByClassName("fav-btn");

for (var i = 0; i < favButtons.length; i++) {

    favButtons[i].onclick = function () {
        var heart = this.getElementsByTagName("img")[0];

        if (heart.src.includes("heart-empty.png")) {
            heart.src = "Images/heart-full.png"; 
        } else {
            heart.src = "Images/heart-empty.png";
        }
    };

}




//add requests page
var requestForm = document.getElementById("requestForm");

if (requestForm) {

    requestForm.onsubmit = function(event) {

        event.preventDefault(); 
         // check name
        var firstName = requestForm.elements["fName"].value;
        var lastName  = requestForm.elements["LName"].value;

        if (firstName === "" || lastName === "") {
            alert("Please enter your full name *first and last name*");
            return false;
        }

        var hasNumberInFirst = /[0-9]/.test(firstName);
        var hasNumberInLast  = /[0-9]/.test(lastName);

        if (hasNumberInFirst || hasNumberInLast) {
            alert("Name must not contain numbers.");
            return false;
        }

        var hasCharInFirst = /[?!@]/.test(firstName);
        var hasCharInLast  = /[?!@]/.test(lastName);

        if (hasCharInFirst || hasCharInLast) {
            alert("Name must not contain ?, !, or @ characters.");
            return false;
        }

        // check service
        var requestServiceValue = document.getElementById("serviceSelect").value;

        if (requestServiceValue === "Select Service") {
            alert("Please select a service ");
            return false;
        }
       // check date
        var dueDateValue = requestForm.elements["dueDate"].value;

        if (dueDateValue == "") {
            alert("Please select a due date.");
            return false;
        }

        var today = new Date();
        today.setHours(0, 0, 0, 0); 

        var selectedDate = new Date(dueDateValue);

        var diffTime = selectedDate.getTime() - today.getTime();
        var diffDays = diffTime / (1000 * 60 * 60 * 24);

        if (diffDays < 1) {
            alert("Due date is too soon Please choose a later date ");
            return false;
        }
        // check Description
        var descriptionValue = requestForm.elements["Request-Description"].value;

        if (descriptionValue.length < 1) {
            alert("Description must be at least 100 characters.");
            return false;
        }
        //confirm massage
        var confirmStay = confirm(
            "Your request has been sent successfully \nDo you want to stay on this page to add more requests?"
        );

        if (confirmStay) {
         
              var container = document.getElementById("requestsContainer");

            container.innerHTML +=
                "<div class='request-item'>" +
                "<p><strong>Name:</strong> " + firstName + " " + lastName + "</p>" +
                "<p><strong>Service:</strong> " + requestServiceValue + "</p>" +
                "<p><strong>Due Date:</strong> " + dueDateValue + "</p>" +
                "<p><strong>Description:</strong> " + descriptionValue + "</p>" +
                "<hr>" +
                "</div>";

            requestForm.reset();

            return false;
        } else {
            window.location.href = "previousRequests.html";
            return false;
        }
        
    };
}
//service eval page 
var evalForm = document.getElementById("evalForm");

if (evalForm) {

    evalForm.onsubmit = function(event) {

        event.preventDefault(); 
        // check Service
        var evalServiceValue = document.getElementById("service-eval").value;

        if (evalServiceValue === "choose a service") {
            alert("Please select a service to evaluate ");
            return false;
        }

        // check Rating
        var ratingInputs = evalForm.elements["rating"];
        var selectedRating = "";
        var i;

        for (i = 0; i < ratingInputs.length; i++) {
            if (ratingInputs[i].checked) {
                selectedRating = ratingInputs[i].value;
                break;
            }
        }

        if (selectedRating === "") {
            alert("Please select a rating ");
            return false;
        }
        //check feedback
        var feedbackValue = evalForm.elements["feedback"].value;

        if (feedbackValue == "") {
            alert("Please enter your feedback ");
            return false;
        }

        var ratingNumber = parseInt(selectedRating, 10);

        if (ratingNumber >= 3) {
            alert("PureRide appreciates your positive feedback Your satisfaction means a lot to us!”");
        } else {
            alert("We are sorry that you are not fully satisfied We will work to improve our service ");
        }

        window.location.href = "previousRequests.html";
        return false;
    };
}



// About As (Registor form)
function validateForm() {

    var form = document.getElementById("joinTeamForm");

    var firstName = form.fName.value;
    var lastName = form.lName.value;
    var email = form.email.value;
    var dob = form.DOB.value;
    var area = form["Area-Expertise"].value;
    var skills = form.skills.value;
    var education = form.education.value;
    var message = form.message.value;
    var photoInput = form.photo;

    var errors = [];

   
    if (!firstName || !lastName || !email || !dob || !area || !skills || !education || !message || !photoInput.value) {
        errors.push("Please fill in all fields.");
    }

    
   if (firstName.search(/^\d/) !== -1 || lastName.search(/^\d/) !== -1) {
    errors.push("Names cannot start with a number.");
}

    
    if (education === "Choose Education Level") {
        errors.push("Please select an education level.");
    }

    
   
    if (photoInput.files.length === 0) {
        errors.push("Please upload a photo.");
    } 
    else {
        var fileName = photoInput.files[0].name.toLowerCase();

       
        if (fileName.search(/\.(jpg|jpeg|png|gif|webp)$/) === -1) {
            errors.push("Photo must be an image file (jpg, jpeg, png, gif, webp).");
        }
    }


     if (dob && dob > "2008-12-31") {
    errors.push("Date of birth must be 2008 or earlier.");
}


    if (errors.length > 0) {

        var messageText = "";
        for (var i = 0; i < errors.length; i++) {
            messageText += errors[i] + "\n";
        }

        alert(messageText);
        return false;
    }


    var fullName = firstName + " " + lastName;
    alert("Thank you, " + fullName + ". Your application has been submitted.");

    form.reset();
    document.getElementById("fileNameBox").style.display = "none";

    return false; 
}





function getFileName() {
    var input = document.getElementById('photo');
    var box = document.getElementById('fileNameBox');

    if (input.files.length > 0) {
        box.style.display = "block";
        box.textContent = input.files[0].name;
    } else {
        box.style.display = "none";
        box.textContent = "";
    }
}


















window.addEventListener("DOMContentLoaded", function () {
  var container = document.getElementById("dynamicServices");
  if (!container) return;

  var servicesJSON = localStorage.getItem("services");
  if (!servicesJSON) {
    container.innerHTML = "<p>No added services yet.</p>";
    return;
  }

  var services;
  try {
    services = JSON.parse(servicesJSON);
  } catch (e) {
    return;
  }

  if (!Array.isArray(services) || services.length === 0) {
    container.innerHTML = "<p>No added services yet.</p>";
    return;
  }

  services.forEach(function (srv) {
    var article = document.createElement("article");
    article.className = "card__continer";

    var imgSrc = "Images/CarWash.png";

    article.innerHTML = `
      <div class="card__media">
        <img src="${imgSrc}" alt="${srv.name}">
      </div>
      <div class="card__body">
        <h2 class="card__title">${srv.name}</h2>
        <p class="card__text">
          ${srv.description}
        </p>
        <div class="card__price">
          ${srv.price} SR
        </div>
      </div>
    `;

    container.appendChild(article);
  });
});

function handleDelete(event) {
  event.preventDefault();

  var checkedBoxes = document.querySelectorAll('.card__checkbox:checked');

  if (checkedBoxes.length === 0) {
    alert("Please select at least one member.");
    return;
  }

  var confirmDelete = confirm("Are you sure you want to delete selected members?");
  if (!confirmDelete) {
    return;
  }

  for (var i = 0; i < checkedBoxes.length; i++) {
    var cb = checkedBoxes[i];
    var card = cb.closest ? cb.closest('.card__continer') : cb.parentElement;
    if (card && card.parentNode) {
      card.parentNode.removeChild(card);
    }
  }

  alert("Selected members have been deleted.");
}

function handleAddMember(event) {
  event.preventDefault();

  var firstNameInput = document.getElementById("firstName");
  var lastNameInput  = document.getElementById("lastName");
  var photoInput     = document.getElementById("photo");

  var firstName = firstNameInput.value.trim();
  var lastName  = lastNameInput.value.trim();
  var photoFiles = photoInput.files;

  var errors = [];

  if (firstName === "") {
    errors.push("First name is required.");
  }
  if (lastName === "") {
    errors.push("Last name is required.");
  }

  if (firstName !== "" && /^[0-9]/.test(firstName)) {
    errors.push("First name cannot start with a number.");
  }
  if (lastName !== "" && /^[0-9]/.test(lastName)) {
    errors.push("Last name cannot start with a number.");
  }

  if (!photoFiles || photoFiles.length === 0) {
    errors.push("Photo is required.");
  }

  if (errors.length > 0) {
    alert(errors.join("\n"));
    return;
  }

  var fullName = firstName + " " + lastName;

  var deleteForm = document.getElementById("deleteForm");
  var deleteButton = deleteForm.querySelector('button[type="submit"]');

  var newCard = document.createElement("article");
  newCard.className = "card__continer";

  var imgSrc = "Images/staff1.jpg";

  newCard.innerHTML = ''
    + '<div class="card__media">'
    + '  <img src="' + imgSrc + '" alt="Staff Photo">'
    + '</div>'
    + '<div class="card__body">'
    + '  <h3 class="card__title">' + fullName + '</h3>'
    + '</div>'
    + '<input type="checkbox" class="card__checkbox">';

  deleteForm.insertBefore(newCard, deleteButton);

  alert("New member '" + fullName + "' added successfully.");

  document.getElementById("addMemberForm").reset();
}

function handleAddService(event) {
  event.preventDefault();

  let nameInput  = document.getElementById("serviceName");
  let priceInput = document.getElementById("servicePrice");
  let descInput  = document.getElementById("serviceDescription");
  let photoInput = document.getElementById("photo");

  let name  = nameInput.value.trim();
  let priceStr = priceInput.value.trim();
  let desc  = descInput.value.trim();
  let photoFiles = photoInput.files;

  let errors = [];

  if (name === "") {
    errors.push("Service name is required.");
  }
  if (priceStr === "") {
    errors.push("Service fee is required.");
  }
  if (desc === "") {
    errors.push("Service description is required.");
  }
  if (!photoFiles || photoFiles.length === 0) {
    errors.push("Service photo is required.");
  }

  if (name !== "" && /^[0-9]/.test(name)) {
    errors.push("Service name cannot start with a number.");
  }

  let price = Number(priceStr);
  if (priceStr !== "" && (isNaN(price) || price <= 0)) {
    errors.push("Service fee must be a positive number.");
  }

  if (desc !== "" && desc.length < 10) {
    errors.push("Service description must be at least 10 characters.");
  }

  if (errors.length > 0) {
    alert(errors.join("\n"));
    return;
  }

  let servicesJSON = localStorage.getItem("services");
  let services;

  if (servicesJSON) {
    services = JSON.parse(servicesJSON);
  } else {
    services = [];
  }

  let newService = {
    name: name,
    price: price,
    description: desc,
    photoName: (photoFiles.length > 0 ? photoFiles[0].name : "")
  };

  services.push(newService);

  localStorage.setItem("services", JSON.stringify(services));

  alert("Service '" + name + "' added and saved successfully.");
  document.getElementById("addServiceForm").reset();
}