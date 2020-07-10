<template>
	<div class="searchPageBox">
		<div class="searchBox">
			<input type="text" placeholder="请输入税务关键词" v-model="searchVal" @click="goSySearchPage">
			<span @click="goIndex">取消</span>
			<section>
				<ul>
					<li v-for="(item, key) in autoCompleteData" :key="key" @click="clickAutoComData(item)">{{ item }}</li>
				</ul>
			</section>
		</div> 

		<div class="historyRecords">
			<h2 class="historyRecordsTitle">历史记录</h2>
			<img src="../../../static/img/deletePic.png" alt="" @click="clearStorage">
			<ul v-if="isShowHistory">
				<li>鱼</li>
        <li>烤鸭</li>
        <li>美食</li>
        <li>北京炸酱面</li>
			</ul>	
		</div>

		<div class="hotSearch">
			<h2>热门搜索</h2>
			<ul>
				<li>小吃</li>
        <li>爆肚</li>
        <li>北京特色</li>
        <li>糖醋里脊</li>
        <li>烘培</li>
        <li>红烧豆腐</li>
        <li>辣椒炒肉</li>
			</ul>
		</div>

	</div>
</template>

<script>
import { mapState } from 'vuex'
export default {
	name: 'searchpage',
	data() {
		return {
			hotwordsData: [],
			autoCompleteData: [],
			searchVal: '',
			historyRecord: JSON.parse(localStorage.getItem('key')) || [],
			isShowHistory: true
		}
	},
	mounted() {
		//this.getHotwords();
	},
	watch: {
		searchVal() {
			this.autoComplete();
		},
	},
	// computed: {
	// 	...mapState(['seachCondition'])
	// },
	methods: {
		// getHotwords() {
		// 	var _this = this;
		// 	this.getAxios('/sysuser1/fg/hotsw/list', {
		// 		num: 10
		// 	})
		// 	.then(res => {
		// 		if (res.code === 0) {
		// 			this.hotwordsData = res.data;
		// 		}
		// 	})
		// },
		// autoComplete() {
		// 	var _this = this;
		// 	console.log(this.searchVal)
		// 	this.getAxios('/resource1/fg/resource/search/list?content=' + this.searchVal)
		// 	.then(res => {
		// 		if (res.code === 0) {
		// 			_this.autoCompleteData = res.data.slice(0, 5);
		// 		}
		// 	})
		// },
		clickAutoComData(item) {
			this.searchVal = item;
			this.$store.state.seachCondition = item;
			this.$router.push('/searchlistpage')
			var listObj = {
				searchVal: this.searchVal.substring(0, 10)
			}
			
			this.historyRecord.unshift(listObj)
			//OOOOO
		
			//OOOOOO
			var listArr = this.historyRecord.slice(0, 5)
			localStorage.setItem('key', JSON.stringify(listArr))
			this.searchVal = ''
		},
		clickHisWord(item) {
			this.searchVal = item.searchVal;
			this.$store.state.seachCondition = item.searchVal;
			this.$router.push('/searchlistpage');
		},
		clickHotWord(item) {
			this.searchVal	= item.hotSearchWord;
			this.$store.state.seachCondition = item.hotSearchWord;
			this.$router.push('/searchlistpage');
		},
		clearStorage() {
			localStorage.clear();
			this.historyRecord = []
			this.isShowHistory = false;
		},
		goIndex() {
			this.$router.push('/index')
		},


		//new methods*************
		goSySearchPage () {
			this.$router.push ( {
				path: 'sySearchPage'
			} )
		}
	}
}
</script>

<style lang="less" scoped>
  .searchPageBox {
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: #fff;
  }
	.searchBox {
		width:100%;
		background-size:100% 100%;
		padding:.1rem 0 .11rem 0;
		position:relative;
		section {
			position:absolute;
			width:3rem;
			left:.15rem;
			background:#fff;
			z-index:2;
			border-radius:5px;
			box-shadow:3px 3px 3px #888888;
			padding:0 .3rem;
			max-height:4rem;
			bottom:-3.9rem;
			ul {
				width:100%;
				line-height:.8rem;
			}
		}
		input {
			display:inline-block;
			width:3.085rem;
			height:.37rem;
			background:#F2F2F2;
			border-radius:33px;
			border:none;
			outline:none;
			text-indent:.435rem;
			background-image:url(../../../static/img/nav_search.png);
			background-repeat:no-repeat;
			background-size:.13rem .13rem;
			background-position:.215rem .12rem;
			margin-left:.16rem;
		}
		span {
			font-weight:500;
			color:#333333;
			font-size:.14rem;
			margin-left:.085rem;
		}
	}
	.historyRecords {
		width:100%;
		position:relative;
		img {
			position:absolute;
			top:.05rem;
			right:.12rem;
			width:.16rem;
			height:.16rem;
		}
		h2 {
			font-weight:bold;
			color:#222222;
			font-size:.17rem;
			margin:.46rem 0 0 .15rem;
		}
		ul {
			width:100%;
			margin-top:.19rem;
      padding:0 .15rem;
      overflow: hidden;
			li {
				float:left;
				padding:0 .14rem;
				height:.33rem;
				font-weight:500;
				color:#666666;
				font-size:.14rem;
				border-radius:15px;
				line-height:.33rem;
        margin:0 .15rem .13rem 0;
        background: #F8F8F8;
			}
		}
	}
	.hotSearch {
		width:100%;
		clear:both;
		margin-top:.245rem;
		h2 {
			font-weight:bold;
			color:#222222;
			font-size:.17rem;
			margin-left:.15rem;
		}
		ul {
			width:100%;
			padding:0 .15rem;
			margin-top:.2rem;
			li {
				float:left;
				padding:0 .14rem;
				height:.33rem;
				background:#fff;
				border-radius:6px;
				font-weight:500;
				color:#555961;
				font-size:.14rem;
				line-height:.33rem;
        margin:0 .15rem .13rem 0;
        border:1px solid rgba(238,238,238,1);
			}
		}
	}
	
</style>
