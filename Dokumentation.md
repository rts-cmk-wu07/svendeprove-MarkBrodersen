# Dokumentation for Landrup Dans

Svendeprøve, Mark Brodersen

Forår 2023

- [Landrup Dans appen](#Landrup-Dans-appen)
- [Tech-stack](#tech-stack)
- [Perspektivering](#perspektivering)
- [Kode-eksempel](#kode-eksempel)

## Landrup Dans appen

Landrup Dans appen bruges til at man skal kunne se en oversigt over forskellige klasser som man kan melde sig på. Komplet med search, calendar, som skal kunne gøre det nemmere at finde klasser og få oversigt over hvilken klasse man har meldt sig på.

## Tech-stack

- **React** Hvad er React?

Jeg har valgt React fordi - Frameworked har et stort community, en rigtig god dokumentation og der er stor eftersprørgsel på arbejdsmarkedet

- **Tailwind** Hvad er tailwind?

Jeg valgte Tailwindcss fordi - Det er hurtigtere end normal css, overskueligt, har kompatibilitet, og standardisering

- **Lucide-react** Hvad er Lucide-react?

Lucide-react er en icon pakke som giver et kæmpe udvalg af iconer til de fleste situationer og kommer med rundede hjørner som passer bedre end iconerne på mockuppen af siden jeg har lavet.

- **Framer-motion** Hvad er framer-motion?

Framer-motion giver masser af gode værktøjer når man laver animationer som f.eks. at gøre det muligt at give en exit-animation til et element når det skal skiftes ud eller forsvinde helt fra siden. Det giver også en nem og let forstålig syntax og har en god dokumentation som gør det nemt at komme i gang med og komme videre hvis man sidder med et problem.

- **Axios** Hvad er axios?

Jeg har valgt at bruge axios da det er en god måde at lave et fetch som gør at man ikke først skal konvertere dataen om til json men gør det for en i stedet og så er det også baguds kombatibelt

- **React-router-dom** Hvad er react-router-dom?

React-router-dom er et fantasktisk værktøj som gør det muligt at skifte view uden at skulle re-render hele siden for at give brugeren en mere flydende følelse af siden.

- **React-use-cookie** Hvad er react-use-cookie?

React-use-cookie gør så man kan lave en cookie ligeså nemt som at lave et state når man bruger react-use-cookie får man en variable og en update function tilbage.

- **React-loader-spinner** Hvad er react-loader-spinner?

React-loader-spinner er en animations pakke som giver en masse forskillige loading animations som gør det let at implementerer for mange forskillige situtioner.

## Perspektivering

- **React** Jeg har valgt react over Angular.

Da react er mere fleksibelt i forhold til angular da angular er batteries-only hvilket ville sige at det installerer alt der hører til angular hvor i mod React lader en vælge de pakker der passer bedre til ens projekt

- **Tailwind** Jeg valgte tailwind over bootstrap.

Da tailwind giver mere fleksibilitet end bootstrap på den måde at bootstrap holder sig i et 12 linjede grid for at give den samme afstand imellem elementer på siden og giver få muligheder for at gå ud af boxen hvorimod tailwind giver en masse generiske classes som også gør det let at give samme afstand mellem elementer men også mere mulighed for at være mere fleksibel hvis noget skal placeres anderledes.

- **Lucide-react** Jeg har valgt lucide-react over feather-icons-react.

På grund af at lucide-react har et mere unikt og meget større udvalg af iconer som man style på samme måde.

- **Framer-motion** Jeg valgte framer-motion over react-simple-animate

Framer-motion og react-simple-animate minder meget om hinanden men framer-motion gør det muligt at give en exit animation på elementer som bliver skiftet ud og gør det let at lave animationer som kan genbruges ved at lave utility classes.

- **Axios** Jeg valgte axios over fetch

Fordi axios er bagudkompatibelt og så mindsker det syntaxen.

- **React-router-dom** Jeg valgte react-router-dom over router5

Fordi dokumentationen på react-router-dom er mere uddybende.

- **React-use-cookie** Jeg valgte react-use-cookie over react-cookie

Da react-use-cookie virkede som det perfekte valg for denne opgave da den giver en kortere syntax er nem at opsætte og har en bedre dokumentation.

- **React-loader-spinner** Jeg valgte react-loader-spinner over react-spinners

Fordi react-loader-spinner har en god dokumentation og er nemmer at style og har en anderledes form for animationer end man finder i andre pakker og så er den byggede til loading animationer.

## Animationer

- **Welcome animation** Jeg har animeret min "Kom i gang" knap på velkomst-siden så den kommer ind fra venstre siden efter 1.5 sekunder.

- **Log ind Modal** Jeg animere min modal ind med opacity og så ud derefter med -translate-x-100%.

- **Error message** Jeg har animerede om en error besked hvis man ikke kan tilmelde sig

## Ændringere på appen

- **Back button** Jeg har valgt at tilføje en luk knap på min login modal da der ellers ikke er andre måder at komme væk fra det view uden at logge ind.

- **Log ind knap** Jeg tilføjet en log ind knap både på aktiviterer siden og i navbaren da jeg synes der skal være flere muligheder for at kunne logge ind.

## Fremtidens Landrup Dans

Jeg tænker det ville være et fint sted at starte at kunne oprette og rediger en bruger for at gøre det lidt mere personligt og gøre det nemmer at se hvem der kommer til de forskillige aktiviteter og lave en tilsvarende react-native app så man ikke ville behøves at bruge forskellige browser og så det får lidt mere personlighed.

## Kode-eksempel

Jeg har valgt at vise min useAxios custom hook nedeunder er et stykke kode, der henter, behandler data, tjekker efter fejl og sætter et loading state til true i starten og til false i slutningen for at gøre det nemt at lave loading animation i mens brugeren venter på dataen

```javascript
import axios from "axios";
import { useEffect, useState } from "react";

export default function useAxios({ url, method = "GET", headers = {} }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(
    function () {
      (async function () {
        if (!url) throw new Error(`Invaild url`);
        try {
          setLoading(true);
          const response = await axios({ url, method, headers });
          setData(response.data);
        } catch (error) {
          console.error(error);
          setError("Noget gik galt");
        } finally {
          setLoading(false);
        }
      })();
    },
    [url]
  );

  return { data, loading, error };
}
```

i min useAxios hook laver jeg først nogle states for at gemme dataen, sætte loading statede til true i mens den kører og til false når jeg kommer til mit sidste promise som er finally for at kunne lave en animation til brugeren mens de venter på at dataen er klar og det sidste state for error handleing.

Jeg har wrapped mit axios kald i en useEffect for at gøre så den kun kører når den får urlen. Derefter har jeg lavet en iife (Immediately invoked function expression).

Derefter laver jeg en guard clause som tjekker om der er en url ellers skal den sende en error efter det sætter den mit loading state til true med setLoading hvilket er en update function som kommer med react.

Så laver jeg en variabel (response) som laver et axios kald som bruger props som jeg sender med når jeg bruger hooken. Derefter sætter jeg mit data state til response.data og får dataen.

Men så i mit catch promise sender den en error i consolen hvis den finder en fejl.

Så sætter jeg loading til false i finally promisede.

Og til sidst returner jeg data, loading og error states.

## Tilmeld function

Her under vil jeg fortælle om min Tilmeld function som bestemmer om man skal kunne tilmelde sig

```javascript
const { token } = useContext(TokenContext);
  const { userData } = useContext(UserDataContext);
  const [tilmeldLoading, setTilmeldLoading] = useState(false);
  const { modal, setModal } = useContext(ModalContext);
  const [checker, setChecker] = useState(null);
  const id = useParams().id;
  const [error, setError] = useState(null);
  const { data, loading } = useAxios({
    url: `http://localhost:4000/api/v1/activities/${id}`,
    headers: {
      accept: "application/json",
    },
  });

  const { data: users } = useAxios({
    url: `http://localhost:4000/api/v1/users/${userData}`,

    headers: {
      Authorization: "Bearer " + token,
    },
  });

  useEffect(() => {
    const userId = data && data?.users.map((user) => user.id);
    if (userId && userId.includes(userData) === false) {
      setChecker(false);
    } else {
      setChecker(true);
    }
  }, [data]);

  async function handleTilmeld(event) {
    setTilmeldLoading(true);
    event.preventDefault();
    if (checker === false) {
      await handleSubmit();
    }
    if (checker === true) {
      await handleDelete();
    }
    setTilmeldLoading(false);
  }
  async function handleSubmit() {
    try {
      const response = await axios.post(
        `http://localhost:4000/api/v1/users/${userData}/activities/${id}`,
        {},
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setError(false);
      console.log(response);
    } catch (error) {
      console.log(error);
      setError(true);
    }
    setChecker(true);
  }
  async function handleDelete() {
    try {
      const response = await axios.delete(
        `http://localhost:4000/api/v1/users/${userData}/activities/${id}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setError(false);
      console.log(response);
    } catch (error) {
      console.log(error);
      setError(true);
    }
    setChecker(false);
  }

  function ageCals() {
    if (users?.age > data?.maxAge) {
      return true;
    }
    if (users?.age <= data?.minAge) {
      return true;
    }
    return false;
```
