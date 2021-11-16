<template>
    <div class="container-fluid">
        <div class="container mainContent">
            <div class="row justify-content-center title">
                <h2>時刻表與票價查詢</h2>
            </div>
        </div>
        <div class="container selection">
              <div class="row justify-content-center trip">
                <div class="col-6">
                    <label for="departure">起程站</label>
                    <br>
                    <select name="departure">
                        <option value="0990">南港</option>
                        <option value="1000">台北</option>
                        <option value="1010">板橋</option>
                        <option value="1020">桃園</option>
                        <option value="1030">新竹</option>
                        <option value="1035">苗栗</option>
                        <option value="1040">台中</option>
                        <option value="1043">彰化</option>
                        <option value="1047">雲林</option>
                        <option value="1050">嘉義</option>
                        <option value="1060">台南</option>
                        <option value="1070">左營</option>
                    </select>
                </div>
                <div class="col-6">
                    <label for="arrival">到達站</label>
                    <br>
                    <select name="arrival">
                        <option value="0990">南港</option>
                        <option value="1000">台北</option>
                        <option value="1010">板橋</option>
                        <option value="1020">桃園</option>
                        <option value="1030">新竹</option>
                        <option value="1035">苗栗</option>
                        <option value="1040">台中</option>
                        <option value="1043">彰化</option>
                        <option value="1047">雲林</option>
                        <option value="1050">嘉義</option>
                        <option value="1060">台南</option>
                        <option value="1070">左營</option>
                    </select>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.mainContent{
    position: relative;
    .title{
        ::after{
        content: "";
        display: block;
        position: absolute;
        width: 90px;
        height: 3px;
        left: 50%;
        bottom: 0;
        background-color: #ca4f0f;
        margin-left: -45px;
        }
    }
}
.selection{
    background: rgb(252, 250, 250);
}

</style>