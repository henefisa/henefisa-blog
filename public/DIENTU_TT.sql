create database DIENTU_TT
use DIENTU_TT
go

create table khachhang(
MaKH varchar(10) primary key,
TenKH varchar(50),
Email varchar(50),
SoDT int,
DiaChi varchar(50)
)
create table dmsanpham(
MaDM varchar(10) primary key,
TenDanhMuc varchar(50),
MoTa varchar(50)
)
create table sanpham(
MaSP varchar(10) primary key,
MaDM varchar(10),
TenSP varchar(50),
SoLuong int,
GiaTien int,
XuatXu varchar(50),
foreign key(MaDM) references dmsanpham(MaDM)
)
create table thanhtoan(
MaTT varchar(10) primary key,
PhuongThucTT varchar(50)
)

create table donhang(
MaDH varchar(10) primary key,
MaKH varchar(10),
MaTT varchar(10),
NgayDat date,
foreign key(MaKH) references khachhang(MaKH),
foreign key(MaTT) references thanhtoan(MaTT)
)
Create table chitietdonhang(
MaDH varchar(10),
MaSP varchar(10), 
SoLuong int,
TongTien int,
primary key(MaDH,MaSP),
foreign key(MaSP) references sanpham(MaSP),
foreign key(MaDH) references donhang(MaDH)
)
insert into khachhang values
('KH001', 'Tran Van An', 'antv@gmail.com', '0905123564' ,'Lang Son'),
('KH002' ,'Phan Phuoc' ,'phuocp@gmail.com' ,'0932568984' ,'Da Nang'),
('KH003' ,'Tran Huu Anh', 'anhth@gmail.com', '0901865232', 'Ha Noi')
insert into dmsanpham values
('DM01', 'Thoi Trang Nu', 'vay ao danh cho nu'),
('DM02', 'Thoi Trang Nam' ,'quan danh cho nam'),
('DM03' ,'Trang suc', 'danh cho nu va nam')
insert into sanpham values
('SP001', 'DM01', 'Dam Maxi', 200, 195000, 'VN'),
('SP002', 'DM01', 'Tui Da Mỹ', 50, 3000000, 'HK'),
('SP003', 'DM02' ,'Lac tay Uc', 300, 300000, 'HQ')
insert into donhang values
('DH001','KH002', 'TT01', '2014/10/20'),
('DH002','KH002' ,'TT01', '2015/5/15'),
('DH003', 'KH001', 'TT03' ,'2015/4/20')
insert into thanhtoan values
('TT01', 'Visa'),
('TT02' ,'Master Card'),
('TT03', 'JCB')
insert into chitietdonhang values
('DH001','SP002', 3, 56000),
('DH003' ,'SP001', 10, 27444),
('DH002' ,'SP002', 10 ,67144)
--Câu 1: Thực hiện yêu cầu sau:
--a. Tạo một khung nhìn có tên là V_KhachHang để thấy được thông tin của tất cả các
--đơn hàng có ngày đặt hàng nhỏ hơn ngày 06/15/2015 của những khách hàng có địa
--chỉ là "Da Nang".
create view V_KhachHang as
select dh.MaDH, dh.MaKH, dh.MaTT, NgayDat
from donhang dh join khachhang kh on dh.MaKH=kh.MaKH
where dh.NgayDat < '2015/06/15' and kh.DiaChi='Da Nang'
--b. Thông qua khung nhìn V_KhachHang thực hiện việc cập nhật ngày đặt hàng thành
--06/15/2015 đối với những khách hang đặt hàng vào ngày 06/15/2014. 
update V_KhachHang
set NgayDat='2015/06/15'
where NgayDat='2014/06/15'

--Câu 2: Tạo 2 thủ tục:
--a.Thủ tục Sp_1: Dùng để xóa thông tin của những sản phẩm có mã sản phẩm được
--truyền vào như một tham số của thủ tục. 
create procedure Sp_1
(@MaSP varchar(10)) 
as
begin 
delete from sanpham where MaSP=@MaSP
end 
execute Sp_1 'SP001'
--b. Thủ tục Sp_2: Dùng để bổ sung thêm bản ghi mới vào bảng CHITIETDONHANG
--(Sp_2 phải thực hiện kiểm tra tính hợp lệ của dữ liệu được bổ sung là không trùng
--khóa chính và đảm bảo toàn vẹn tham chiếu đến các bảng có liên quan). 
create procedure Sp_2(
@MaDH varchar(10),
@MaSP varchar(10), 
@SoLuong int,
@TongTien float
)
as
begin
if exists (select MaDH from donhang where MaDH=@MaDH) and exists(select MaSP from sanpham where MaSP=@MaSP)
begin
if exists (select MaDH from chitietdonhang where MaDH=@MaDH)
begin
print 'da trung du lieu'
rollback tran
end
else insert into chitietdonhang values(@MaDH,@MaSP,@SoLuong,@TongTien)
end
else 
begin
print 'khong ton tai don hang hoac san pham update'
rollback tran
end
end
execute Sp_2 'DH002' ,'SP002', 10 ,67144 

--Câu 3: Viết 2 bẫy sự kiện (trigger) cho bảng CHITIETDONHANG theo yêu cầu sau:
--a. Trigger_1: Khi thực hiện đăng ký mới một đơn đặt hàng cho khách hàng thì cập nhật
--lại số lượng sản phẩm trong bảng sản phẩm (tức là số lượng sản phẩm còn lại sau khi
--đã bán). Bẫy sự kiện chỉ xử lý 1 bản ghi. 
create trigger trigger_1 on chitietdonhang
for insert
as
begin
declare @MaSP varchar(10)
declare @SoLuong int
select MaSP=@MaSP, SoLuong=@SoLuong
from inserted
update sanpham set SoLuong=SoLuong-@SoLuong where MaSP=@MaSP
end
create trigger Tg_1 on chitietdonhang
after insert
as
begin
declare @MaSP varchar(10)
declare @SoLuong int
select MaSP=@MaSP, SoLuong=@SoLuong
from inserted
update sanpham set SoLuong=(SoLuong-@SoLuong) where MaSP=@MaSP
end
--b. Trigger_2: Khi cập nhập lại số lượng sản phẩm mà khách hàng đã đặt hàng, kiểm tra
--xem số lượng cập nhật có phù hợp hay không (số lượng phải lớn hơn 1 và nhỏ hơn
--100). Nếu dữ liệu hợp lệ thì cho phép cập nhật, nếu không thì hiển thị thông báo "số
--lượng sản phẩm được đặt hàng phải nằm trong khoảng giá trị từ 1 đến 100" và thực
--hiện quay lui giao tác.
create trigger trigger_2
on chitietdonhang
for update
as
begin
declare @SoLuong int
select SoLuong=@SoLuong
from inserted
if(@SoLuong between 1 and 100) update chitietdonhang set SoLuong=@SoLuong
else
begin
print 'số lượng sản phẩm được đặt hàng phải nằm trong khoảng giá trị từ 1 đến 100'
rollback tran
end
end

--Câu 4: Tạo hàm do người dùng định nghĩa (user-defined function) để tính điểm thưởng cho
--khách hàng của tất cả các lần đặt hàng trong năm 2014, mã khách hàng sẽ được truyền
--vào thông qua tham số đầu vào của hàm. Cụ thể như sau:
--- Nếu tổng số tiền khách hàng đã trả cho tất cả các lần mua hàng dưới 2.000.000, thì trả
--về kết quả là khách hàng được nhận 20 điểm thưởng.
--- Nếu tổng số tiền khách hàng đã trả cho tất cả các lần mua hàng từ 2.000.000 trở đi, thì
--trả về kết quả là khách hàng được nhận 50 điểm thưởng
create function user_defined(@MaKH varchar(10))
returns varchar(20)
as
begin
declare @no varchar(20)
if exists (select kh.MaKH from khachhang kh join donhang dh on kh.MaKH=dh.MaKH
join chitietdonhang ct on dh.MaDH=ct.MaDH where kh.MaKH=@MaKH 
and YEAR(dh.NgayDat)='2014'
group by kh.MaKH
having sum(ct.TongTien)>2000000)
begin
set @no='khách hàng được nhận 50 điểm thưởng'
end
else
begin
set @no='khách hàng được nhận 20 điểm thưởng'
end
return @no
end
select dbo.user_defined ('KH001')









	
	
	