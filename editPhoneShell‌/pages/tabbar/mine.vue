<template>
home
</template>

<script setup>

</script>

<style lang="scss" scoped>
.mine-page {
	min-height: 100vh;
	padding: 28rpx;
	box-sizing: border-box;
	&__header,
	&__stat-card,
	&__menu {
		border-radius: 32rpx;
		box-shadow: 0 22rpx 56rpx rgba(24, 36, 51, 0.08);
	}

	&__header {
		display: flex;
		align-items: center;
		gap: 24rpx;
		padding: 32rpx;
		background: linear-gradient(135deg, #ffffff 0%, #eff4fb 100%);
	}

	&__avatar,
	&__name,
	&__id,
	&__login-arrow,
	&__stat-value,
	&__stat-label,
	&__menu-text,
	&__menu-arrow {
		display: block;
	}

	&__avatar {
		width: 104rpx;
		height: 104rpx;
		border-radius: 32rpx;
		background: linear-gradient(135deg, #182433 0%, #36557a 100%);
		box-shadow: 0 18rpx 36rpx rgba(24, 36, 51, 0.16);
		font-size: 34rpx;
		font-weight: 700;
		line-height: 104rpx;
		text-align: center;
		color: #ffffff;

		&--image {
			display: block;
			object-fit: cover;
		}
	}

	&__name {
		font-size: 34rpx;
		font-weight: 700;
		color: #182433;
	}

	&__id {
		margin-top: 12rpx;
		font-size: 24rpx;
		color: #7a8697;
	}

	&__info {
		flex: 1;
	}

	&__login-arrow {
		font-size: 30rpx;
		color: #9aa5b5;
	}

	&__stats {
		display: flex;
		gap: 18rpx;
		margin-top: 24rpx;
	}

	&__stat-card {
		flex: 1;
		padding: 26rpx 18rpx;
		text-align: center;
		background: rgba(255, 255, 255, 0.92);
	}

	&__stat-value {
		font-size: 36rpx;
		font-weight: 700;
		color: #182433;
	}

	&__stat-label {
		margin-top: 12rpx;
		font-size: 24rpx;
		color: #7a8697;
	}

	&__menu {
		margin-top: 24rpx;
		padding: 10rpx 28rpx;
		background: rgba(255, 255, 255, 0.92);
	}

	&__logout {
		margin-top: 24rpx;
		height: 92rpx;
		border: 0;
		border-radius: 28rpx;
		background: linear-gradient(135deg, #c4573c 0%, #e08356 100%);
		box-shadow: 0 20rpx 36rpx rgba(196, 87, 60, 0.18);
		font-size: 28rpx;
		font-weight: 700;
		color: #ffffff;
	}

	&__menu-item {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 28rpx 0;

		& + & {
			border-top: 1rpx solid rgba(24, 36, 51, 0.06);
		}
	}

	&__menu-text {
		font-size: 28rpx;
		color: #243447;
	}

	&__menu-arrow {
		font-size: 28rpx;
		color: #9aa5b5;
	}
}
</style>
