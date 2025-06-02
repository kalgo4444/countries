let elSelect = document.querySelector(".capital-choose")
let counter_listEl = document.querySelector(".country-list")
let inputEl = document.querySelector(".search-input")
const countLike = document.querySelector(".forLikeClass")
const countSave = document.querySelector(".forSaveClass")


const darkThemeBtn = function () {
	document.documentElement.classList.toggle("dark")
}

let count = 0
const countLikeOnclick = function () {
	count++
	countLike.textContent = count
	count >= 10 ? countLike.textContent = "10" : count
}
let count1 = 0
const countSaveOnclick = function () {
	count1++
	countSave.textContent = count1
	count1 >= 10 ? countSave.textContent = "10" : count1
}


const createOptionToSelect = (arr, list) => {
	arr.forEach(item => {
		let elOption = document.createElement("option")
		elOption.classList.add("dark:bg-[#2B3844]")
		elOption.value = item.capital.toLowerCase()
		elOption.textContent = item.capital
		elSelect.appendChild(elOption)
	})
}
createOptionToSelect(countries, elSelect)


const renderCard = function (arr, list) {
	list.innerHTML = ""
	arr.forEach(item => {
		let elItm = document.createElement("li")
		list.appendChild(elItm)
		elItm.outerHTML = `	
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
									onclick="countLikeOnclick()"
										class="w-[30%] py-[5px] border-[1px] border-slite-500 rounded-md cursor-pointer hover:bg-slate-200 active:bg-slate-300 active:scale-95 transition-transform duration-200"
									>
										Like
									</button>
									<button
										class="w-[30%] py-[5px] border-[1px] border-slite-500 rounded-md cursor-pointer hover:bg-slate-200 active:bg-slate-300 active:scale-95 transition-transform duration-200"
									>
										More
									</button>
									<button
									onclick="countSaveOnclick()"
										class="w-[30%] py-[5px] border-[1px] border-slite-500 rounded-md cursor-pointer hover:bg-slate-200 active:bg-slate-300 active:scale-95 transition-transform duration-200"
									>
										Save
									</button>
								</div>
							</div>
						</li>`
	})
}
renderCard(countries, counter_listEl)


elSelect.addEventListener("change", function (evn) {
	let changeValue = evn.target.value
	if (changeValue == "all") {
		renderCard(countries, counter_listEl)
	} else {
		let filterList = countries.filter(i => i.capital.toLowerCase() == changeValue)
		renderCard(filterList, counter_listEl)
	}
})

const inputElOnclick = function () {
	let userInputValue = inputEl.value
	if (!userInputValue.trim()) return null
	let filterEL = countries.filter(i => i.name.toLowerCase() == userInputValue.toLowerCase())
	renderCard(filterEL, counter_listEl)
	// inputEl.value = ""
}