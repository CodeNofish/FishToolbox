# puts("你好世界")

# here document
print <<EOF
多行字符串here document
EOF

# 结束语句
END {
  puts "结束语句 在程序结尾被调用"
}

# 初始语句
BEGIN {
  puts "初始语句 在程序运行之前被调用"
}

=begin
注释 好丑
=end

# 表达式值
puts "表达式值 #{1024 * 10}"

# 数组
arr = ["fred", 10, 3.14]
arr.each do |i|
  puts i
end

# 哈希类型
colors = { "red" => 0xf00, "green" => 0x0f0 }
colors.each do |key, value|
  print key, " is ", value, "\n"
end

# 范围类型
(10..15).each do |n|
  print n, ' '
end
print '\n'

