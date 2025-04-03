<template>
    <header>
        <h1>Le Boulanger</h1>
        <table>
            <thead>
                <tr>
                    <th>Or gagné</th>
                    <th>Or dépensé</th>
                    <th>Farine produite</th>
                    <th>Baguettes produites</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
            </tbody>
        </table>
    </header>
    <section>
        <div class="title-box">
            <h2>Boulangerie</h2>
            <button>Fermer la boulangerie</button>
        </div>
        <div class="boulangerie">
            <img src="./assets/boulangerie.jpg" alt="Dessin d'une boulangerie" />
            <table>
                <tbody>
                    <tr>
                        <td>Niveau</td>
                        <td>1</td>
                        <td><button>&#43;</button></td>
                        <td>100 &#128176;</td>
                    </tr>
                    <tr>
                        <td>Moulins</td>
                        <td>1</td>
                        <td><button>&#43;</button></td>
                        <td>80 &#128176;</td>
                    </tr>
                    <tr>
                        <td>Or</td>
                        <td>51.5 &#128176;</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Farine</td>
                        <td>488</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Baguettes</td>
                        <td>2 &#129366;</td>
                        <td></td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </section>
    <section>
        <div class="title-box">
            <h2>Commande</h2>
        </div>
        <table id="table-commande">
            <thead>
                <tr>
                    <th>&#128242;</th>
                    <th>&#129366;</th>
                    <th>&#128176;/&#129366;</th>
                    <th>&#128176;&#128176;&#128176;</th>
                    <th>&#8986;</th>
                    <th>&#128483;</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(commande, i) in [...Array(10).keys()]" :key="i">
                    <td v-for="(v, k) in [...Array(5).fill(0)]" :key="k">{{ v }}</td>
                    <td>En attente...</td>
                </tr>
            </tbody>
        </table>
    </section>
    <section>
        <div class="title-box">
            <h2>Log</h2>
        </div>
    </section>
</template>

<script setup></script>
