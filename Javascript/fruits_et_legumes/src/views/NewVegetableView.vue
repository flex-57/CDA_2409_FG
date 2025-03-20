<template>
    <h1>Ajouter un légume</h1>
    <form action="">
        <div class="form-grp">
            <label for="input-name">Nom</label>
            <input type="text" id="input-name" name="name" />
        </div>
        <div class="form-grp">
            <label for="input-variety">Variété</label>
            <input type="text" id="input-variety" name="variety" />
        </div>
        <div class="form-grp">
            <label for="input-primary-color">Couleur</label>
            <input type="text" id="input-primary-color" name="primary-color" />
        </div>
        <div class="form-grp">
            <label for="input-lifetime">Durée de conservation</label>
            <input type="number" id="input-lifetime" name="lifetime" />
        </div>
        <div class="form-grp">
            <label id="label-box-radio">Frais</label>
            <div id="box-radio">
                <div>
                    <input type="radio" id="input-fresh" name="fresh" />
                    <label for="input-fresh" class="label-radio">Oui</label>
                </div>
                <div>
                    <input type="radio" id="input-not-fresh" name="fresh" />
                    <label for="input-not-fresh" class="label-radio">Non</label>
                </div>
            </div>
        </div>
        <div class="form-grp">
            <label for="input-price">Price</label>
            <input type="number" id="input-price" name="price" step=".01" />
        </div>
        <div class="form-grp">
            <label></label>
            <input type="submit" id="btn-submit" value="Ajouter" />
        </div>
    </form>
</template>

<script setup></script>
