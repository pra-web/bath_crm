<template>
    <section class="content">
        <div class="row">
            <div class="col-md-4">
                <div class="box">
                    <div class="box-body">
                        <div class="row">
                            <div class="col-md-12 col-xs-12">
                                <div class="info-box">
                                    <span class="info-box-icon bg-blue"><i class="fa fa-rub"></i></span>
                                    <div class="info-box-content">
                                        <span class="info-box-text">Ваш баланс</span>
                                        <span class="info-box-number">41,410 рублей</span>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-12 col-xs-12">
                                <div class="info-box">
                                    <span class="info-box-icon bg-green"><i class="fa fa-money"></i></span>
                                    <div class="info-box-content">
                                        <span class="info-box-text">Вы можете вывести</span>
                                        <span class="info-box-number">41,410 рублей</span>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    </div>      
                </div>
            </div>
            <div class="col-md-8">
                <div class="box">
                    <div class="box-body">
                        <select class="form-control">
                            <option>Вывести денежные средства на реквизиты, указанные в профиле</option>
                            <option>Вывести на альтернативный счет организации</option>
                            <option>Вывести на карту</option>
                        </select>
                        <br>
                        <div class="input-group">
                            <span class="input-group-addon"><i class="fa fa-credit-card-alt"></i></span>
                            <input type="text" class="form-control" placeholder="Номер карты">
                        </div>
                        <br>
                        <div class="form-group">
                            <label>Ввести сумму:</label>
                            <input type="text" class="form-control" placeholder="Сумма">
                        </div>
                        <div class="form-group">
                            <div class="checkbox">
                                <label>
                                <input type="checkbox">
                                Двухэтапная авторизация с кодом на смс
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="box-footer">
                        <button type="submit" class="btn btn-primary">Вывести</button>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
</script>
<style>
</style>
