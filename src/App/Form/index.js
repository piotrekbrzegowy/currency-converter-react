import { useState } from "react";
import { currencies } from "../currencies";
import { Result } from "./Result";
import { StyledForm, Header, Content, Input, Footer, Button } from "./styled";

export const Form = ({ calculateResult, result }) => {
    const [currency, setCurrency] = useState(currencies[0].short);
    const [amount, setAmount] = useState("");

    const onSubmit = (event) => {
        event.preventDefault();
        calculateResult(currency, amount);
    }

    return (
        <StyledForm onSubmit={onSubmit}>
            <Header>Przelicznik walut</Header>
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
                        {currencies.map((currency => (
                            <option
                                key={currency.short}
                                value={currency.short}
                            >
                                {currency.name}
                            </option>
                        )))}
                    </Input>
                </label>
            </p>
            <p>
                <Button>Przelicz!</Button>
            </p>

            <Footer>
                Kursy pochodzą ze strony www.internetowykantor.pl z dnia 30.06.2021
            </Footer>

            <Result result={result} />
        </StyledForm>
    )
}