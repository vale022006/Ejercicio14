const DateTime = luxon.DateTime;

// Inicializar datepicker
const picker = datepicker('#birthdate', {
    formatter: (input, date) => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        input.value = `${day}/${month}/${year}`;
    }
});

// Calcular edad
document.getElementById("calculate").addEventListener("click", () => {
    const inputValue = document.getElementById("birthdate").value;

    if (!inputValue) {
        document.getElementById("result").textContent = "Please enter a valid date.";
        return;
    }

    const [day, month, year] = inputValue.split("/").map(Number);

    const birth = DateTime.fromObject({ day, month, year });
    const today = DateTime.now();

    if (!birth.isValid || birth > today) {
        document.getElementById("result").textContent = "Invalid birth date.";
        return;
    }

    const diff = today.diff(birth, ["years", "months", "days"]).toObject();

    const years = Math.floor(diff.years);
    const months = Math.floor(diff.months);

    document.getElementById("result").innerHTML =
        `You are <strong>${years} years ${months} months</strong> old`;
});
