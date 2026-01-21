import '../../App.css'

export function Home() {
    return (
        <div className="flex flex-col text-center items-center gap-[45px]">
            <p className="text-4xl font-bold">
                Не соромтеся звертатися до мене
            </p>
            <div className="flex flex-col items-center gap-5">
                <img
                    className="rounded-[50%] w-[160px] h-[160px]]"
                    src="https://upload.wikimedia.org/wikipedia/commons/a/a6/Anonymous_emblem.svg"
                    alt="Артем Мальцев"
                />
                <p className="text-[20px] font-bold">
                    Артем Мальцев
                </p>
                <p className="text-[12px] opacity-[0.7] text-center">
                    Усі позиції 100% оригінал!
                    <br/>
                    Особисто відповідаю на всі запитання з 10:00 - 22:00 по Києву
                    <br/>
                    Відправляємо відливанти кожного дня
                    <br/>
                    Термін відправки на кожне замовлення відливантів - протягом 5 днів
                    <br/>
                    Флакони - під замовлення, наявність і термін відправки уточнюйте індивідуально
                    <br/>
                    (мінімум 4-7 робочих дня)
                </p>
            </div>
            <p className="font-light">
                Питання стосовно замовлень: <a className={"text-gray-500 hover:text-[#1155cc] transition-colors text-xl"} href="https://t.me/artemmaltsevwork">@artemmaltsevwork</a>
            </p>
        </div>
    )
}


