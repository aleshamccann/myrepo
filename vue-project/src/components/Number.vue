<script setup>
import { reactive, ref} from 'vue'

const titleClass = ref('title')
const message = ref('Let\'s play with numbers!') // reactive state
const prompt = ref('Enter a number between 1-100.')
const userNumber = ref('')
const isValidNumber = ref('')
const isEvenNumber = ref('')
const isPrimeNumber = ref('')
const isFibonacciNumber = ref('')

// give each number requirement a unique id
let id = 0
const numberRequirements = ref([
    { id: id++, text: 'Greater than or equal to 1' },
    { id: id++, text: 'Less than or equal to 100' },
    { id: id++, text: 'Maximum of 3 digits' },
    { id: id++, text: 'Whole number' },
    { id: id++, text: 'Non-negative' }
])


function validateNumber(){
    isValid(userNumber.value);
    isPrime(userNumber.value);
    isFibonacci(userNumber.value);
    isEven(userNumber.value);
}

// Valid Number
function isValid(n){
    document.getElementById('yourNumber').hidden = false;
    document.getElementById('validNumber').hidden = false;

    if (n >= 1 && n <= 100 && n % 1 === 0)
    {
        isValidNumber.value = true
    }
    else
    {
        isValidNumber.value = false
    }
}

// Even number
function isEven(n) {
    // A number is even if it is divisible by 2
    if ( n % 2 === 0 )
    {
        isEvenNumber.value = true;
    }
    else
    {
        isEvenNumber.value = false;
    }
}

// Prime Number
function isPrime(n){
    if (n <= 1)
    {
        isPrimeNumber.value = false;
        return;
    }

    // Check from 2 to the square root of the number
    for (let i = 2; i <= Math.sqrt(n); i++)
    {
        // If number is divisible by any number between 2 and its square root, it is not prime
        if (n % i === 0) 
        {
            isPrimeNumber.value = false;
            return;
        }
    }
    isPrimeNumber.value = true;
}

//Fibonacci Sequence
function isFibonacci(n) {
    // A number is a Fibonacci number if one of (5*num*num + 4) or (5*num*num - 4) is a perfect square
    if (Math.sqrt(5*(n*n)-4) % 2 === 0 || Math.sqrt(5*(n*n)+4) % 2 === 0) 
    {
        isFibonacciNumber.value = true;
    } 
    else 
    { 
        isFibonacciNumber.value = false;
    }
}

</script>

<template>
    <div class="section-one">
        <div class="heading">
            <h1> {{ message }} </h1>
        </div>
        <p> {{ prompt }} </p>
        <ul>
            <li v-for="numberRequirement in numberRequirements" :key="numberRequirements.id">
                {{ numberRequirement.text }}
            </li>
        </ul>
        <form @submit.prevent="validateNumber">
            <input id="inputNumber" v-model="userNumber" required placeholder="Your Number" maxlength="3">
            <button>Submit</button>
        </form>
        <p id="yourNumber" hidden class="specialNumber">Your number is: {{ userNumber }}</p>
        <div id="validNumber" hidden class="specialNumber">
            <p v-if="isValidNumber" >Yay! You entered a valid number!</p>
            <p v-else >Oh no! You entered an invalid number!</p>
        </div>
    </div>
    <div v-if="isValidNumber" class="section-two">
        <ul>
            <li v-if="isEvenNumber" id="evenNumber">
                <p>Your number is an <span class="specialNumber">even number</span>!</p>
                <p><em>An even number is a whole number that is able to be divided</em></p>
                <p><em>by two into two equal whole numbers.</em></p>
            </li>
            <li v-else id="oddNumber">
                <p>Your number is an <span class="specialNumber">odd number</span>!</p>
                <p><em>An odd number is any number that cannot be divided by 2 evenly.</em></p>
            </li>
            <li v-if="isPrimeNumber" id="primeNumber">
                <p>Your number is a <span class="specialNumber">prime number!</span></p>
                <p><em>A prime number is whole number greater than 1 that cannot be exactly divided</em></p> 
                <p><em>by any whole number other than itself and 1.</em></p>
            </li>
            <li v-if="isFibonacciNumber" id="FibonacciNumber">
                <p>Your number is a <span class="specialNumber">Fibonacci number!</span></p>
                <p><em>The Fibonacci Sequence is a series of numbers in which each number (Fibonacci number)</em></p>
                <p><em>is the sum of the two preceding numbers.</em></p>
            </li>
        </ul>
    </div>


</template>

<style>
    .heading {
        margin: 50px;
        color:white;
        text-align: center;
    }

    .section-one {
        color:white;
        display: flex;
        flex-direction: column;
        align-items: center;
        min-width: 100vw;
    }

    .section-two {
        margin: 40px;
        color:white;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .specialNumber {
        color: #26fbeb;
        font-style: bold;
    }

    ul > p {
        font-style: italic
    }
</style>