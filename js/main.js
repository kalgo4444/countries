let capital_chooseEL = document.querySelector(".capital-choose")
let country_listEl = document.querySelector(".country-list")
let search_inputEl = document.querySelector(".search-input")
let forLikeClassEl = document.querySelector(".forLikeClass")
let forSaveClassEl = document.querySelector(".forSaveClass")
const modal_wrapperEl = document.querySelector(".modal-wrapper")
const modal_innerEl = document.querySelector(".modal-inner")


const darkThemeBtn = function () {
	document.documentElement.classList.toggle("dark")
}


const optionToSelect = function (arr, list) {
	arr.forEach(item => {
		let optionEl = document.createElement("option")
		optionEl.classList.add("dark:bg-[#2B3844]")
		optionEl.value = item.capital.toLowerCase()
		optionEl.textContent = item.capital
		capital_chooseEL.appendChild(optionEl)
	})
}
optionToSelect(countries, capital_chooseEL)


const createCard = function (arr, list) {
	list.innerHTML = ""
	arr.forEach(item => {
		let elItem = document.createElement("li")
		list.appendChild(elItem)
		elItem.outerHTML = `
					<li class="rounded-[5px] shadow-md rounded-b-md" data-aos="fade-up">
							<img src=${item.flag} alt="" class="h-[160px] object-cover w-full"/>
							<div class="p-[15px]">
								<strong class="text-xl">${item.name}</strong>
								<p class="font-bold mt-3">
									Population:
									<span class="font-normal">${item.population}</span>
								</p>
								<p class="font-bold mt-3">
									Region: <span class="font-normal">${item.name}</span>
								</p>
								<p class="font-bold mt-3">
									Capital: <span class="font-normal">${item.capital}</span>
								</p>
								<div class="flex items-center gap-[10px] mt-[20px]">
									<button
									onclick=countLikeOnclick(${item.id})
										class="${item.isLiked ? "bg-red-500 text-white" : ""} w-[30%] py-[5px] border-[1px] border-slite-500 rounded-md cursor-pointer active:scale-95 transition-transform duration-75"
									>
										Like
									</button>
									<button onclick="moreBtn(${item.id})"
										class="w-[30%] py-[5px] border-[1px] border-slite-500 rounded-md cursor-pointer active:scale-95 transition-transform duration-200"
									>
										More
									</button>
									<button
									onclick="countSaveOnclick(${item.id})"
										class="${item.isBasket ? "bg-blue-300 text-white" : ""} w-[30%] py-[5px] border-[1px] border-slite-500 rounded-md cursor-pointer active:scale-95 transition-transform duration-75"
									>
										Save
									</button>
								</div>
							</div>
						</li>`
	})
}
createCard(countries, country_listEl)


capital_chooseEL.addEventListener("change", function (env) {
	let changeValue = env.target.value
	if (changeValue == "all") {
		createCard(countries, country_listEl)
	}
	else {
		let filterList = countries.filter(i => i.capital.toLowerCase() == changeValue)
		createCard(filterList, country_listEl)
	}
})


search_inputEl.addEventListener("input", function (e) {
	let res = countries.filter(i => i.name.toLowerCase().includes(e.target.value.toLowerCase()) || i.population.toString().includes(e.target.value) || i.capital.toLowerCase().includes(e.target.value.toLowerCase()))
	createCard(res, country_listEl)
})

const countLikeOnclick = function (id) {
	let findObj = countries.find(item => item.id == id)
	findObj.isLiked = !findObj.isLiked
	createCard(countries, country_listEl)
	forLikeClassEl.textContent = countries.filter(i => i.isLiked).length
}
function likeBtn() {
	let res = countries.filter(i => i.isLiked)
	createCard(res, country_listEl)
}

const countSaveOnclick = function (id) {
	let findObj = countries.find(item => item.id == id)
	findObj.isBasket = !findObj.isBasket
	createCard(countries, country_listEl)
	forSaveClassEl.textContent = countries.filter(i => i.isBasket).length
}
function saveBtn() {
	let res = countries.filter(i => i.isBasket)
	createCard(res, country_listEl)
}

function moreBtn(id) {
	let findObj = countries.find(item => item.id == id)
	console.log(findObj)
	modal_wrapperEl.classList.remove("scale-0")
	modal_innerEl.innerHTML = `
			<div class="w-full h-full flex items-center justify-between>
				<img src=${findObj.flag} alt="" class="h-[160px] object-cover w-[300px]"/>
				<div class="flex flex-col gap-3.5">
				<strong class="text-xl">${findObj.name}</strong>
					<p class="font-bold mt-3">
						Population:
						<span class="font-normal">${findObj.population}</span>
					</p>
					<p class="font-bold mt-3">
						Region: <span class="font-normal">${findObj.name}</span>
					</p>
					<p class="font-bold mt-3">
						Capital: <span class="font-normal">${findObj.capital}</span>
					</p>
					<p class="font-bold mt-3">
						Like: <span class="font-normal">${findObj.isLiked ? "Liked city" : "Not liked city"}</span>
					</p>
					<p class="font-bold mt-3">
						Info: <span class="font-normal">${findObj.info}</span>
					</p>
					<p class="font-bold mt-3">
						Location: <span class="font-normal">${findObj.location}</span>
					</p>
				</div>
			</div>
	`

}

modal_wrapperEl.addEventListener("click", (e) => e.target.id && modal_wrapperEl.classList.add("scale-0"))