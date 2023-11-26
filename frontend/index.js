async function sprintChallenge5() { // Note the async keyword, in case you wish to use `await` inside sprintChallenge5
  // 👇 WORK WORK BELOW THIS LINE 👇

  // https://dev.to/alexmercedcoder/making-multiple-api-calls-in-javascript-kip
  // about promise.all

  const url1 = "http://localhost:3003/api/learners";
  const url2 = "http://localhost:3003/api/mentors";

    axios.all([
      axios.get(url1), 
      axios.get(url2)
    ])
    .then(axios.spread((learners, mentors) => {
    const data1 = learners.data;
    const data2 = mentors.data;
    // console.log(data1);
    // console.log(data2);
    const status = document.querySelector(".info");
    status.textContent = "No learner is selected";

    data1.forEach((item, index) => {
      const card = document.createElement("div");
      card.classList.add("card");

      // Creating card's children elements
      const name = document.createElement("h3");
      const email = document.createElement("div");
      const mentorList = document.createElement("h4");
      const unorderedList = document.createElement("ul");
      for (let p = 0; p < data1[index].mentors.length; p++) {
        const listedItem = document.createElement("li");
        listedItem.textContent = data1[index].mentors[p];
        unorderedList.appendChild(listedItem);
      };

      name.textContent = item.fullName;
      email.textContent = item.email;
      mentorList.textContent = "Mentors";
      // WIP -  working on the mentor name list 
      // for (let q = 0; q < data1.length; q++) {
      //   for (let w = 0; w < data1[q].mentors.length; w++) {
      //     let z = 0;
      //     let blnMatch = false;
      //     while (z < data2.length || !blnMatch) {
      //       if (data2[z].id === data1[q].mentors[w]) {
      //         blnMatch = true;
      //         listedItem.innerHTML = listedItem.innerHTML + `<li>${data2[z].firstName} ${data2[z].lastName}</li>`;
      //       };
      //       z++;
      //     };
      //   };
      // };
      // unorderedList.appendChild(listedItem);
      mentorList.classList.add("closed");
      card.appendChild(name);
      card.appendChild(email);
      card.appendChild(mentorList);
      card.appendChild(unorderedList);
      document.querySelector(".cards").appendChild(card);
      // undo the selected card
      card.addEventListener("click", event => {
        let blnFound = false;
        for (let j = 0; j < card.classList.length; j++) {
          if (card.classList[j] === "selected") {
            blnFound = true;
          };
        };
        let i = 0;
        document.querySelectorAll(".card").forEach(item => {
          // if (event.target !== mentorList) {
            item.classList.remove("selected");
            item.getElementsByTagName("h3")[0].textContent = data1[i].fullName;
            i++;
        });
        if (blnFound && event.target !== mentorList) {
          status.textContent = "No learner is selected";
        } else {
          card.classList.add("selected");
          card.getElementsByTagName("h3")[0].textContent = `${item.fullName}, ID ${item.id}`;
          status.textContent = `The selected learner is ${item.fullName}`;
        };
      });
      // WIP - working on the Mentor drop-down reset
      // if (event.target === mentorList) {
        mentorList.addEventListener("click", event => {
          for (let k = 0; k < mentorList.classList.length; k++) {
            if (mentorList.classList[k] === "closed") {
              mentorList.classList.remove("closed");
              mentorList.classList.add("open");
            } else {
              mentorList.classList.remove("open");
              mentorList.classList.add("closed");
            };
          };
        });
      // };
    });
    document.querySelectorAll(".card ul li").forEach(li => {
      for (let i = 0; i < data2.length; i++) {
        if (li.textContent === data2[i].id.toString()) {
          li.textContent = `${data2[i].firstName} ${data2[i].lastName}`
        }
      }
    })
  }))
  .catch(error => {
    console.log(error.message);
  });

  ///////////////////////////////////////////////////////////////////////////////////

  const footer = document.querySelector('footer')
  const currentYear = new Date().getFullYear()
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`

  // 👆 WORK WORK ABOVE THIS LINE 👆
}

// ❗ DO NOT CHANGE THE CODE  BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = { sprintChallenge5 }
else sprintChallenge5()
