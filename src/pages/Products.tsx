import { useEffect, useState, ChangeEvent } from "react";
import { supabase } from "../supabaseClient";
import PetsList from "../components/PetsList";
import { PetCard } from "../models/PetsCardInterface";

function Products() {
    // The fetchedPets variable is just to save the original array
    const [fetchedPets, setFetchedPets] = useState<PetCard[] | null>([]);
    const [petsToRender, setPetsToRender] = useState<PetCard[] | null>([]);

    async function fetchThePets(abortCont: any) {
        let { data: pets, error } = await supabase
            .from("pets")
            .select("*")
            .abortSignal(abortCont.signal);

        if (error) {
            return;
        }
        setPetsToRender(pets);
        setFetchedPets(pets);
    }

    useEffect(() => {
        const abortCont = new AbortController();
        fetchThePets(abortCont);
        //Cleanup
        return () => {
            abortCont.abort();
        };
    }, []);

    function handleInputChange(
        e: ChangeEvent<HTMLInputElement>,
        petSearch: PetCard[] | null
    ) {
        if (!petSearch) return;
        const searchQuery = e.target.value.toLowerCase();
        const filteredArray: PetCard[] = petSearch?.filter((pet) => {
            return pet.name.toLowerCase().includes(searchQuery);
        });

        if (searchQuery.length === 0) {
            setPetsToRender(fetchedPets);
            return;
        }

        setPetsToRender(filteredArray);
    }

    return (
        <div className="w-[1091px] h-auto bg-[#E0B9A3] mt-4 border-4 border-[#337B91] rounded-lg shadow-md flex flex-col items-center">
            <input
                type="text"
                placeholder="Search for a pet"
                onChange={(e) => handleInputChange(e, fetchedPets)}
                className="inputs w-52 mt-4"
            />

            <PetsList petsToRender={petsToRender} />
        </div>
    );
}

export default Products;
