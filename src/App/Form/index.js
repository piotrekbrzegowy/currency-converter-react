import { useState } from "react";
import { Result } from "./Result";
import { StyledForm, Header, Content, Input, Footer, Button, Loading, Failure } from "./styled";
import { useRatesData } from "./useRatesData"

export const Form = () => {
    const [result, setResult] = useState();
    const ratesData = useRatesData();

    const calculateResult = (currency, amount) => {
        const rate = ratesData.rates[currency];

        setResult({
            sourceAmount: +amount,
            targetAmount: amount * rate,
            currency,
        });
    };

    const [currency, setCurrency] = useState("EUR");
    const [amount, setAmount] = useState("");

    const onSubmit = (event) => {
        event.preventDefault();
        calculateResult(currency, amount);
    };

    return (
        <StyledForm onSubmit={onSubmit}>
            <Header>Przelicznik walut</Header>
            {ratesData.state === "loading"
                ? (
                    <Loading>
                        Ładuję kursy z Europejskiego Banku Centralnego...
                    </Loading>
                )
                : (ratesData.state === "error"
                    ? (
                        <Failure>
                            Coś poszło nie tak... Sprawdź czy masz połączenie z internetem.
                        </Failure>
                    ) : (
                        <>
                            <p>
                                <label>
                                    <Content>Kwota w zł*:</Content>
                                    <Input
                                        value={amount}
                                        onChange={({ target }) => setAmount(target.value)}
                                        placeholder="Wpisz kwotę w zł"
                                        type="number"
                                        required
                                        step="0.01"
                                        min="0"
                                    />
                                </label>
                            </p>
                            <p>
                                <label>
                                    <Content>Waluta:</Content>
                                    <Input
                                        as="select"
                                        value={currency}
                                        onChange={({ target }) => setCurrency(target.value)}
                                    >
                                        {Object.keys(ratesData.rates).map(((currency) => (
                                            <option
                                                key={currency}
                                                value={currency}
                                            >
                                                {currency}
                                            </option>
                                        )))}
                                    </Input>
                                </label>
                            </p>
                            <p>
                                <Button>Przelicz!</Button>
                            </p>

                            <Footer>
                                Kursy pobierane są z Europejskiego Banku Centralnego.
                                Pobrane dnia: <strong>{ratesData.date}</strong>
                            </Footer>

                            <Result result={result} />
                        </>
                    )
                )}
        </StyledForm>
    );
};