const elm = document.querySelector(".crd");
const Children = document.getElementById("main_frm").children;

const getdata = async () => {
  const p = await fetch("/data");
  let data = await p.json();
  var n = data.length;

  if (data.length == 0) {
    elm.style.display = "none";
  }

  for (i = 1; i < n; i++) {
    card = elm.cloneNode(true);
    card.classList.add("card" + (i + 1));
    document.getElementById("main_frm").appendChild(card);
  }

  document.getElementById("num").innerHTML += " " + n;

  for (i = 0; i < n; i++) {
    Children[i].querySelector("li.fullname").innerHTML +=
      data[i].firstName + " " + data[i].lastName;
    Children[i].querySelector("li.Id").innerHTML += data[i]._id;
    Children[i].querySelector("li.mail").innerHTML += data[i].email;
    Children[i].querySelector("li.contact").innerHTML += data[i].contact;
  }

  const del_btns = document.querySelectorAll(".del");
  const currenthost = window.location.hostname;
  const currentport = window.location.port;

  del_btns.forEach((x, i) => {
    x.addEventListener("click", () => {
      if (confirm(`Deleting user with Id: ${data[i]._id}`) == true) {
        fetch(
          `http://${currenthost}:${currentport}/deleteUser/${data[i]._id}`
        ).then(window.location.reload());
      }
    });
  });
};
getdata();
