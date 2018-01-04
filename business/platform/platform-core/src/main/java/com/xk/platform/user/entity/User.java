package com.xk.platform.user.entity;

import java.util.Date;

public class User {
    private String id;

    private String userCode;

    private String userName;

    private String nickname;

    private String password;

    private Date passwordSetTime;

    private Date passwordExpireTime;

    private String phone;

    private String mobile;

    private String address;

    private String postcode;

    private String email;

    private String validstatus;

    private String createBy;

    private Date createTime;

    private String updateBy;

    private Date updateTime;

    public User(String id, String userCode, String userName, String nickname, String password, Date passwordSetTime, Date passwordExpireTime, String phone, String mobile, String address, String postcode, String email, String validstatus, String createBy, Date createTime, String updateBy, Date updateTime) {
        this.id = id;
        this.userCode = userCode;
        this.userName = userName;
        this.nickname = nickname;
        this.password = password;
        this.passwordSetTime = passwordSetTime;
        this.passwordExpireTime = passwordExpireTime;
        this.phone = phone;
        this.mobile = mobile;
        this.address = address;
        this.postcode = postcode;
        this.email = email;
        this.validstatus = validstatus;
        this.createBy = createBy;
        this.createTime = createTime;
        this.updateBy = updateBy;
        this.updateTime = updateTime;
    }

    public User() {
        super();
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id == null ? null : id.trim();
    }

    public String getUserCode() {
        return userCode;
    }

    public void setUserCode(String userCode) {
        this.userCode = userCode == null ? null : userCode.trim();
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName == null ? null : userName.trim();
    }

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname == null ? null : nickname.trim();
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password == null ? null : password.trim();
    }

    public Date getPasswordSetTime() {
        return passwordSetTime;
    }

    public void setPasswordSetTime(Date passwordSetTime) {
        this.passwordSetTime = passwordSetTime;
    }

    public Date getPasswordExpireTime() {
        return passwordExpireTime;
    }

    public void setPasswordExpireTime(Date passwordExpireTime) {
        this.passwordExpireTime = passwordExpireTime;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone == null ? null : phone.trim();
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile == null ? null : mobile.trim();
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address == null ? null : address.trim();
    }

    public String getPostcode() {
        return postcode;
    }

    public void setPostcode(String postcode) {
        this.postcode = postcode == null ? null : postcode.trim();
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email == null ? null : email.trim();
    }

    public String getValidstatus() {
        return validstatus;
    }

    public void setValidstatus(String validstatus) {
        this.validstatus = validstatus == null ? null : validstatus.trim();
    }

    public String getCreateBy() {
        return createBy;
    }

    public void setCreateBy(String createBy) {
        this.createBy = createBy == null ? null : createBy.trim();
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public String getUpdateBy() {
        return updateBy;
    }

    public void setUpdateBy(String updateBy) {
        this.updateBy = updateBy == null ? null : updateBy.trim();
    }

    public Date getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(Date updateTime) {
        this.updateTime = updateTime;
    }
}