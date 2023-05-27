// ======= CRUD =========

let addBtn = document.querySelector("#add")
let tbody = document.querySelector("tbody")
let bool = true

addBtn.addEventListener("click", () => {
    if (bool) {
        tbody.innerHTML += `
        <tr>
            <td>
                
            </td>
            <td>
                <input type="text" class="form-control">
            </td>
            <td>
                <input type="text" class="form-control">
            </td>
            <td>
                <input type="text" class="form-control">
            </td>
            <td>
                <div class="btn-group">
                    <button class="btn btn-success" onclick="saveRow(this)">
                        <i class="fa-solid fa-floppy-disk"></i>
                    </button>
                    <button class="btn btn-danger" onclick="cancelRow(this)">
                        <i class="fa-solid fa-xmark"></i>
                    </button>
                </div>
            </td>
        </tr>
    `
     bool = !bool
    }else{
        alert("Fill the blanks!")
    }
    sortRows()
})

const cancelRow = (e) => {
    e.closest("tr").remove()
    sortRows()
    bool = !bool
}

const deleteRow = (e) => {
    e.closest("tr").remove()
    sortRows()
}

const sortRows = () => {
    let num = 1;
    let firstItems = document.querySelectorAll("tr td:first-child")

    firstItems.forEach( el => {
        el.innerText = num
        num++
    })
}

const saveRow = (e) => {
    

    if (checkInputs().length == 0) {
        let td = e.closest("tr").querySelectorAll("td:not(:first-child, :last-child)")
        td.forEach( el => {
            el.innerHTML = `<p>${el.querySelector("input").value} </p>`
        })
        e.nextElementSibling.innerHTML = `<i class="fa-solid fa-trash"></i>`
        e.nextElementSibling.setAttribute("onclick", "deleteRow(this)")

        e.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`
        e.setAttribute("onclick", "editRow(this)")
        bool = !bool
    }

}

const editRow = (e) => {
    let td = e.closest("tr").querySelectorAll("td:not(:first-child, :last-child)")
    td.forEach( el => {
        el.innerHTML = `<input type="text" class="form-control" value="${el.querySelector('p').innerText}" />`
    }) 
    e.innerHTML = `<i class="fa-solid fa-floppy-disk"></i>
    `
    e.setAttribute("onclick", "saveRow(this)")
    bool = !bool
}


const checkInputs = () => {
    let arr = []

    let inputs = document.querySelectorAll("input")
    inputs.forEach( el => {
        el.classList.remove("bg-danger")
        if (el.value.length < 1) {
            arr.push(el)
            el.classList.add("bg-danger")
        }
    })
    return arr
}