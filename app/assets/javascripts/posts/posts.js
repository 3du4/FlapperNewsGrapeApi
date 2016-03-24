angular.module('newsDemo')
    .factory('posts', [
        '$http',
        function ($http) {
            var postHost = 'http://localhost:3000/api/v1/posts/';
            var o = {
                posts: []
            };
            o.getAll = function () {
                return $http.get(postHost)
                    .success(function (data) {
                        angular.copy(data, o.posts);
                    });
            };
            o.create = function (post) {
                return $http.post(postHost, post).success(function (data) {
                    o.posts.push(data);
                });
            };
            o.upvote = function (post) {
                return $http.put(postHost + post.id)
                    .success(function (data) {
                        post.upvotes += 1;
                    });
            };
            o.get = function (id) {
                return $http.get(postHost + id).then(function (res) {
                    return res.data;
                });
            };

            //TODO: API for comments
            o.addComment = function (id, comment) {
                return $http.post('/posts/' + id + '/comments.json', comment);
            };
            o.upvoteComment = function (post, comment) {
                return $http.put('/posts/' + post.id + '/comments/' + comment.id + '/upvote.json')
                    .success(function (data) {
                        comment.upvotes += 1;
                    });
            };
            return o;
        }])