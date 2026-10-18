const toast = document.getElementById("toast");
let toastTimer;
function notify(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 3000);
}

document.querySelectorAll('[data-action="like"]').forEach(button => {
  button.addEventListener("click", () => {
    const count = button.querySelector("span");
    const liked = button.dataset.liked === "true";
    button.dataset.liked = String(!liked);
    button.firstChild.textContent = liked ? "♡ Me gusta " : "♥ Te gusta ";
    count.textContent = String(Number(count.textContent) + (liked ? -1 : 1));
  });
});

document.querySelectorAll('[data-action="comment"]').forEach(button => {
  button.addEventListener("click", () => {
    button.parentElement.nextElementSibling.classList.toggle("hidden");
  });
});

document.querySelectorAll('[data-action="send-comment"]').forEach(button => {
  button.addEventListener("click", () => {
    const input = button.previousElementSibling;
    if (!input.value.trim()) return notify("Escribe tu respuesta antes de enviarla.");
    notify("¡Respuesta agregada en esta demostración!");
    input.value = "";
    button.closest(".comment-area").classList.add("hidden");
  });
});

document.querySelector('[data-action="post"]').addEventListener("click", () => {
  notify("¡La creación de publicaciones es una demostración del proyecto!");
});

document.querySelectorAll(".course-button").forEach(button => {
  button.addEventListener("click", () => notify(`Seleccionaste: ${button.dataset.course}. Agrega el contenido real del curso para habilitarlo.`));
});

document.getElementById("chatForm").addEventListener("submit", event => {
  event.preventDefault();
  const input = document.getElementById("chatInput");
  const value = input.value.trim();
  if (!value) return;
  const message = document.createElement("div");
  message.className = "message own";
  const avatar = document.createElement("span");
  avatar.className = "avatar mint";
  avatar.textContent = "TÚ";
  const body = document.createElement("div");
  const name = document.createElement("strong");
  name.textContent = "Tú";
  const text = document.createElement("p");
  text.textContent = value;
  const time = document.createElement("small");
  time.textContent = new Date().toLocaleTimeString("es-MX", {hour: "2-digit", minute: "2-digit"});
  body.append(name, text, time);
  message.append(avatar, body);
  document.getElementById("messages").append(message);
  input.value = "";
  message.scrollIntoView({behavior: "smooth", block: "nearest"});
});

document.getElementById("subscribeButton").addEventListener("click", () => {
  notify("Demo escolar: conecta tu enlace de Stripe para recibir pagos reales.");
});
