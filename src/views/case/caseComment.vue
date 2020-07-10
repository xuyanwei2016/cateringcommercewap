<template>
	<div class="publicCommentPageBox">
		<div class="commentCon">
			<textarea class="site" maxlength="300" @input="descInput" v-model="saveCommentParams.content" placeholder="请输入留言内容"></textarea>
			<span class="limit">{{remnant}}/300</span>
		</div>

    <button class="commitBtn" :disable="disabled" :class="{ 'commitBtnBg' : remnant < 3 }" @click="saveComment">提交留言</button>
	</div>
</template>

<script>
import {
	saveCommentAPI
} from '@/api/sy'
export default {
	name: 'publicCommentPage',
	data() {
		return {
			starVal: '5',
			remnant: 0,
			desc: '',
			disabled: true,
			saveCommentParams: {
				content: null,
				resourceId: this.$route.query.resourceId,
				resourceName: this.$route.query.resourceName,
				resourceType: this.$route.query.resourceType,
				fatherId: 0,
				fatherName: null,
				mainId: 0,
				score: 0
			}
		}
	},
	methods:{
		descInput(){
			var txtVal = this.saveCommentParams.content.length;
			this.remnant = txtVal;
			if ( this.saveCommentParams.content.length < 3 ) {
				this.disabled = true;
			} else {
				this.disabled = false;
			}
		},
		
		saveComment () {
      console.log(this.saveCommentParams, '12333')
			if ( this.disabled === false ) {
				saveCommentAPI ( this.saveCommentParams )
				.then( res => {
					console.log(res, '添加评论');
					if ( res.data.code === 0 ) {
						this.$toast('添加评论成功')
						this.$router.back(-1)
					} else {
						this.$toast( res.data.msg )
					}
				})
			}
		}
	}
}
</script>

<style lang="less" scoped>
.publicCommentPageBox {
	width:100%;
	height:100%;
	overflow:hidden;
	background:#f5f5f5;
}

.commentCon {
	width:100%;
	height:2.035rem;
	position:relative;
	textarea {
		width:100%;
		border:none;
		outline:none;
		width:100%;
		height:100%;
		padding-top:.13rem;
		font-size:.14rem;
		font-weight:500;
		resize:none;
		padding:.13rem .14rem 0;
	}
	textarea::-webkit-input-placeholder {
		color:#AAABB3;
	}
	textarea:-moz-placeholder {
		color:#AAABB3;
	}
	textarea:-ms-input-placeholder {
		color:#AAABB3;
	}
	.limit {
		position:absolute;
		bottom:.145rem;
		right:.15rem;
		z-index:2;
		color:#C8CAD2;
		font-size:.14rem;
		font-weight:500;
	}
}

.commitBtn {
	display: block;
  width: 3rem;
  height: .4rem;
  text-align: center;
  background:linear-gradient(90deg,rgba(228,34,34,1) 0%,rgba(187,6,6,1) 100%);
  box-shadow:0px 1px 18px 0px rgba(186,159,116,0.5);
  border-radius:45px;
  margin: .655rem auto 0;
  color: #FFFFFF;
	font-size: .16rem;
	border: none;
	outline: none;
}

.commitBtnBg {
	background: #727887;
	box-shadow: initial;
}
</style>

