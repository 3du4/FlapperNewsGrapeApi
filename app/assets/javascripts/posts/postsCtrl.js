angular.module('newsDemo')
    .controller('PostsCtrl', [
        '$scope',
        '$stateParams',
        '$http',
        '$location',
        'posts',
        'post',
        function ($scope, $stateParams, $http, $location, posts, post) {
            //TODO
            var postHost = 'http://localhost:3000/api/v1/posts/';
            $scope.post = post;

            $scope.deletePost = function (post) {
                return $http.delete(postHost + post.id).success(function () {
                    $location.path('/home').replace();
                });
            };

            $scope.incrementUpvotes = function (post) {
                posts.upvote(post);
            };


            $scope.addComment = function () {
                if ($scope.body === '') {
                    return;
                }
                posts.addComment(post.id, {
                    body: $scope.body,
                    author: 'user'
                }).success(function (comment) {
                    $scope.post.comments.push(comment);
                });
                $scope.body = '';
            };

            $scope.incrementUpvotes = function (comment) {
                posts.upvoteComment(post, comment);
            };
        }

    ]);
