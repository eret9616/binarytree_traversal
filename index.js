// 递归与迭代

// 递归
// 1 dlr
function traversal(node){
    console.log(node);
    if(node.left){
        traversal(node.left)
    }
    if(node.right){
        traversal(node.right)
    }
}
traversal(root)

// 2 ldr
function traversal(node){
    if(node.left){
        traversal(node.left)
    }
    console.log(node);
    if(node.right){
        traversal(node.right)
    }
}

// 3 lrd
function traversal(node){
    if(node.left){
        traversal(node.left)
    }
    if(node.right){
        traversal(node.right)
    }
    console.log(node);
}

// 迭代
// 1 dlr
function traversal(){
    let stack = []; 
    stack.push(root)

    while(stack[stack.length-1]){
        let top = stack[stack.length-1]
        console.log(top);
        if(top.right){
            stack.push(top.right)
        }

        if(top.left){
            stack.push(top.left)
        }
    }
}


// ldr
// 注意,ldr需要使用一个cur变量来跟踪当前的位置
// 思考如何实现? 使用栈。在递归的模式中，是先到最左侧，当左侧为null的时候，打印栈顶元素，然后找这个元素的右一个，继续找最左侧，重复这个步骤
function traversal(){
    let stack = [];
    let cur = root
    stack.push(root)
    
    while(stack[stack.length-1]){
        if(cur.left){
            stack.push(cur.left)
            cur = cur.left
        }else{
            let pop = stack.pop()
            console.log(pop.val)
            if(pop.right){
                stack.push(pop.right)
                cur = pop.right
            }
        }
    }
}


// lrd
// 如何实现lrd? 在递归模式中，先向左找第一个为null的，然后向右找第一个为null的，然后从栈中弹出并打印，
//                  如果 弹出打印的这个元素，是弹出后栈顶中那个元素的左孩子，那么说明这次弹出的路径是一条，左下的路径..要检查这个弹出后的栈顶元素是否有右孩子，如果有的话，将右孩子入栈，把cur设置为这个右孩子
var traversal = function(root) {
    let stack =[]
    let cur = root
    stack.push(root)
    while(stack[stack.length-1]){
        if(cur.left){
            stack.push(cur.left)
            cur = cur.left
        }else if(cur.right){
            stack.push(cur.right)
            cur = cur.right
        }else{
            // 都为null的情况
            let pop = stack.pop()
            console.log(pop.val);
            let peek = stack[stack.length-1]
            if(peek){
                if(peek.left === pop){
                    
                    if(peek.right){
                        stack.push(peek.right)
                        cur = peek.right
                    }

                }
            }
           
        }
    }
}

// *注意 ldr和 lrd中序和后序都需要用一个current的变量，这是因为，这两种迭代的遍历一开始都会向左一直到底，如果没有current这个变量，只每次弹出栈顶的元素的话，可能会再次进入向左导致无限循环，也就是说需要一个变量来指明当前在走的路径，使用cur.left，而不是stack[stack.length - 1].left


// lrd 2stack
// 两个栈的方法，想象有三个节点的树 1 2 3,前序是123 后序是231，为了打印231，需要栈中是132，那么用两个栈将第一个栈的每次头元素推入栈2，如果有左边入左边，如果有右边入右边，最后将栈2全部打印
function traversal(){
    let stack1 = []
    let stack2 = []
    stack1.push(root)
    let res = []

    while(stack1[stack1.length - 1]){
        let pop = stack1.pop()
        stack2.push(pop)
        if(pop.left){
            stack1.push(pop.left)
        }
        if(pop.right){
            stack1.push(pop.right)
        }
    }

    while(stack2.length){
        res.push(stack2.pop().val)
    }

    return res
}