document.getElementById('submitBtn').addEventListener('click', calculate);

function calculate() {
    const form = document.getElementById('testForm');
    let total = 0;
    let html = '<table><tr><th>Питання</th><th>Ваш вибір</th><th>Бали</th></tr>';

    function radioScore(name) {
        const radios = form[name];
        for (let r of radios) {
            if (r.checked) return parseFloat(r.value);
        }
        return 0;
    }

    function checkboxScore(name) {
        const boxes = form[name];
        let selected = [];
        for (let box of boxes) {
            if (box.checked) selected.push(parseFloat(box.value));
        }
        if (selected.length === 2) return selected[0] + selected[1];
        if (selected.length === 1) return selected[0];
        return 0;
    }

    function selectScore(name) {
        const select = form[name];
        let score = 0;
        for (let option of select.options) {
            if (option.selected) score += parseFloat(option.value);
        }
        if (select.multiple) {
            if (select.selectedOptions.length === 2) score = score;
            else score = 0;
        }
        return score;
    }

    function textScore(name, correct) {
        const val = form[name].value.trim().toLowerCase();
        return val === correct.toLowerCase() ? 1 : 0;
    }

    const scores = [
        {q:'Питання 1', val: radioScore('q1')},
        {q:'Питання 2', val: radioScore('q2')},
        {q:'Питання 3', val: checkboxScore('q3')},
        {q:'Питання 4', val: checkboxScore('q4')},
        {q:'Питання 5', val: selectScore('q5')},
        {q:'Питання 6', val: selectScore('q6')},
        {q:'Питання 7', val: textScore('q7', 'чіназес')}
    ];

    for (let s of scores) {
        html += `<tr><td>${s.q}</td><td>Оцінка: ${s.val}</td><td>${s.val}</td></tr>`;
        total += s.val;
    }
    html += `<tr><td colspan="2"><b>Загальний бал</b></td><td><b>${total}</b></td></tr></table>`;
    document.getElementById('results').innerHTML = html;
}
