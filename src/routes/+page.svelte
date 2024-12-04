<script lang="ts">
    let animal: string = $state("");
    let animalFacts: string[] = $state([]);

    async function getNewFunFacts() {
        animalFacts = ["(loading...)"];
        const response = await fetch(`/facts?animal=${animal}`);
        animalFacts = await response.json();
    }
</script>

<main>
    <h1>Animal Fun Facts!</h1>
    <label for="animal">Animal</label>
    <input id="animal" placeholder="dog" bind:value={animal} />
    <button onclick={getNewFunFacts}> Get New Fun Facts </button>
    <ul>
        {#each animalFacts as animalFact}
            <li>{animalFact}</li>
        {/each}
    </ul>
</main>